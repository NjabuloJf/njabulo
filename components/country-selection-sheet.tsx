"use client"

import { useState, useMemo } from "react"
import { Search, X, ChevronRight } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { COUNTRY_DATA, type CountryType } from "@/lib/constants/country-data"
import { cn } from "@/lib/utils"

interface CountrySelectionSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCountrySelect: (country: CountryType) => void
  selectedCountry?: CountryType | null
}

export function CountrySelectionSheet({
  open,
  onOpenChange,
  onCountrySelect,
  selectedCountry,
}: CountrySelectionSheetProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const regions = useMemo(() => {
    const unique = new Set(COUNTRY_DATA.map((c) => c.region))
    return Array.from(unique).sort()
  }, [])

  const filteredCountries = useMemo(() => {
    return COUNTRY_DATA.filter((country) => {
      const matchesSearch =
        searchQuery === "" ||
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.phoneCode.includes(searchQuery)

      const matchesRegion = selectedRegion === null || country.region === selectedRegion

      return matchesSearch && matchesRegion
    })
  }, [searchQuery, selectedRegion])

  const groupedCountries = useMemo(() => {
    const grouped: Record<string, CountryType[]> = {}
    filteredCountries.forEach((country) => {
      if (!grouped[country.region]) {
        grouped[country.region] = []
      }
      grouped[country.region].push(country)
    })
    return grouped
  }, [filteredCountries])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0 flex flex-col">
        <SheetHeader className="border-b p-4 space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-bold">Pilih Negara</SheetTitle>
            <button onClick={() => onOpenChange(false)} className="p-2 hover:bg-accent rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Cari negara atau kode telpon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Region Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Wilayah</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedRegion === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRegion(null)}
                  className="text-xs"
                >
                  Semua
                </Button>
                {regions.map((region) => (
                  <Button
                    key={region}
                    variant={selectedRegion === region ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRegion(region)}
                    className="text-xs"
                  >
                    {region}
                  </Button>
                ))}
              </div>
            </div>

            {/* Country List by Region */}
            {Object.entries(groupedCountries).map(([region, countries]) => (
              <div key={region} className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground px-2">{region}</h3>
                <div className="space-y-1">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        onCountrySelect(country)
                        onOpenChange(false)
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left",
                        selectedCountry?.code === country.code
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent",
                      )}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">{country.flag}</span>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{country.name}</p>
                          <p className="text-xs text-muted-foreground">{country.phoneCode}</p>
                        </div>
                      </div>
                      {selectedCountry?.code === country.code && <ChevronRight size={18} />}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {filteredCountries.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">Tidak ada negara yang ditemukan</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
