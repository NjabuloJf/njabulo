"use client"

import { useState, useEffect } from "react"
import { subscribeToNotifications, type FirebaseNotification, formatNotificationTime } from "@/lib/notification-service"
import { CountrySelectionSheet } from "@/components/country-selection-sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, X, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { COUNTRY_DATA, type CountryType } from "@/lib/constants/country-data"

export function PairingBottomSheet() {
  const [notifications, setNotifications] = useState<FirebaseNotification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hasNew, setHasNew] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(null)
  const [countrySheetOpen, setCountrySheetOpen] = useState(false)

  useEffect(() => {
    // Load selected country from localStorage
    const saved = localStorage.getItem("selectedCountry")
    if (saved) {
      try {
        const country = JSON.parse(saved)
        setSelectedCountry(country)
      } catch {
        // Invalid JSON, ignore
      }
    } else {
      // Default to Indonesia
      setSelectedCountry(COUNTRY_DATA.find((c) => c.code === "ID") || null)
    }

    const unsubscribe = subscribeToNotifications((newNotifs) => {
      if (notifications.length > 0 && newNotifs.length > notifications.length) {
        setHasNew(true)
      }
      setNotifications(newNotifs)
    })
    return () => unsubscribe()
  }, [notifications.length])

  const handleCountrySelect = (country: CountryType) => {
    setSelectedCountry(country)
    localStorage.setItem("selectedCountry", JSON.stringify(country))
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        {/* Country Selector Button */}
        <Button
          onClick={() => setCountrySheetOpen(true)}
          variant="outline"
          size="sm"
          className="rounded-full gap-2 bg-accent/50 backdrop-blur-sm border-accent hover:bg-accent/70"
        >
          <span className="text-lg">{selectedCountry?.flag || "🌍"}</span>
          <span className="text-xs font-medium hidden sm:inline">{selectedCountry?.code || "SELECT"}</span>
        </Button>

        {/* Notification Bell Button */}
        <button
          onClick={() => {
            setIsOpen(true)
            setHasNew(false)
          }}
          className="relative bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
        >
          <Bell size={24} />
          {hasNew && (
            <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </button>
      </div>

      {/* Country Selection Sheet */}
      <CountrySelectionSheet
        open={countrySheetOpen}
        onOpenChange={setCountrySheetOpen}
        onCountrySelect={handleCountrySelect}
        selectedCountry={selectedCountry}
      />

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="fixed inset-x-0 bottom-0 bg-slate-900 border-t border-slate-800 rounded-t-3xl shadow-2xl p-6 md:max-w-md md:left-auto md:right-4 md:bottom-20 md:rounded-3xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Bell size={20} className="text-blue-500" /> Recent Pairing Events
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Country Info Display */}
            {selectedCountry && (
              <div className="mb-4 p-3 bg-slate-800 rounded-lg border border-slate-700 flex items-center gap-3">
                <span className="text-2xl">{selectedCountry.flag}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-100">{selectedCountry.name}</p>
                  <p className="text-xs text-slate-400">{selectedCountry.phoneCode}</p>
                </div>
              </div>
            )}

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {notifications.length === 0 ? (
                <p className="text-slate-500 text-center py-8">Belum ada notifikasi connection bot.</p>
              ) : (
                notifications.map((notif) => (
                  <Card key={notif.id} className="bg-slate-800 border-slate-700 overflow-hidden">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg flex-shrink-0 ${
                            notif.type === "telegram" ? "bg-blue-500/20" : "bg-green-500/20"
                          }`}
                        >
                          <ExternalLink
                            size={16}
                            className={notif.type === "telegram" ? "text-blue-400" : "text-green-400"}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-100">{notif.title}</p>
                          <p className="text-xs text-slate-400 break-words">{notif.message}</p>
                          <span className="text-[10px] text-slate-500 mt-1 block">
                            {formatNotificationTime(notif.timestamp)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
