import { type NextRequest, NextResponse } from "next/server"
import admin from "firebase-admin"
import { trackBotConnection } from "@/lib/notification-service"

const serviceAccount = {
  type: "service_account",
  project_id: "tokentele-169d4",
  private_key_id: "f1756d08d69a6eb8584d81ba97913182896e0cc0",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCmejfp3z502nE2\nAFRXoN66BaZxD00qvUGhU6J8A3nnRbo1DgaQIGrHczuqAA7i6FzNh3HJwC0kykLQ\nCOU70TSSg5HPYqtOeK49nQ2FQ6nmCq6sOSuyIN5Ablh/6PCdZhO4Nm7yMi2qjohT\nL/dhIXNIdvX+i/4/7cEXL3cPiGJcqYWgazF4bTiMzrcLYm4L4GG1EhPzX2bszP6J\ndHq7TEXdW2wbNxSPxJvQP6nfIf0pttt64U6Eh3IzBRp2BvjmJGKiiQ6qM+s/aXjn\n8nOMPv1GBRc/aLs+GwDjmVtnCKsrjcp0fSQpcisCj2PR0fBpI4ra2PsfuWQ6hs8/\nwLqBxhqRAgMBAAECggEAB+wZhJLn3zo0+H+oA9qHNt2Fd+xlPPMwMBvxh8rHjpKy\nI4u1Er9ELZUlgffKPZCWt/4p01LGozFP4CQIOqJASPejZPXaVpvmGM8EQXMAnw6j\nlNUMqAep4/GMWxvr9WWR6yqF+ZcbNrpdMO4/rLrhiFGG79PcJ9Ep5u9OkGnqWmPw\nJMzTX+JMUxAmBS3I6r9rGAdznDIY8CKRmPAUOm2rvkowaqV4+yJDaPiqBW9ysdO3\ncYQQZUYij6RlETynFNknXzSNnUUjDSHHo5zWd+3o1mtYJCxNcjAUBe/8N1vxSaaD\ns6slcaxVYMyHsF5L7xFlsd6i+O+M0QnI0cGZeooz9QKBgQDb1A/su1vVtcFqMQ+7\n6tNLbX1hodBU/KcuMex/NXr9lKTtNI24n9YnF2FoysdqmpEycCVSUmyEP/7ZZ143\ncjiBU5ZYP/GuZ6TmTXr51NwoRi0DzJ1vZ7Cf87KuybgKNERQyxCLd+yRIzcX1i+m\nX0gkyowTcMifVvI9Lew9n/COXQKBgQDB3tP1fVX9yQnOBsRf4MrwsHsN6ZUNHfh7\n+rh1yVcLgQH0hUcdTFvUWfkI575bDDWqQQ2LA9PmMKxa0iUmDAEKLWb/5Rj8CS0F\n5kC3+c1a+Yy3vQs641I/xhlZQBMn/J5Cgbp8Lxu/01O9/FU1OIPlWrP5gpz7QzM6\n/trPPf/xxQKBgHPQCj+/CYfSxL5McKyg74aafWbVWCueG/mzZZQzOcOk7yrk+BEf\nbDSWFcSeqGbaXcqD2LXBJNib2ojw82skqu4/ekKuFYa7pd2LTlGWuhIhvo902jCa\nISxzuFxre6Esnh0ujl3b5W8lbV4KgnoVUq3HY/rN/XQs21wt+HsS6yolAoGAGNP5\nnyHLBnJdoBX7xi+ardJcH/7/CKwC65XDU8pSLHX8Ex2Sau0hgYN4QiyzkyNwJ/qm\nylvWIk+vcv4gpcu5wlzoKPNlDLn8GxpOxYDnTLRS0iEStBryqJotGuH60g8nEWtd\nv5Ok4R8mRVlwbB1tvsyr6dNRWVhU0kRbL1lIUuUCgYBXDD0FEXWBw0mwSiBXsLpg\nJhcivYORCbSHvsEWmVNlawokQTBa8SkNCSL4LKjEzslE+hC60qNSVVEKrkk/whBO\n0dLJw1RP+nC3Gu8Da1N1DbgkFqhGfl+Tt/LRAmDiSUfW6dvjqdQ+vY1V5Rfhva8n\nlnHRmvn7/gK9/n23o7DBxA==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@tokentele-169d4.iam.gserviceaccount.com",
  client_id: "116691566379728419473",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40tokentele-169d4.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
}

export async function POST(request: NextRequest) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    })
  }

  const db = admin.firestore()
  db.settings({ ignoreUndefinedProperties: true })
  const tokensCollection = db.collection("whatsapp_tokens")

  try {
    const { phoneNumber, botName, recaptchaToken } = await request.json()
    console.log("[Katsumi] WhatsApp connection request received for:", botName)

    if (recaptchaToken) {
      try {
        const recaptchaResponse = await fetch("https://kastumibot.vestia.icu/api/recaptcha/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: recaptchaToken }),
        })

        const recaptchaData = await recaptchaResponse.json()

        if (!recaptchaData.success) {
          console.warn("[Katsumi] WhatsApp reCAPTCHA verification failed with score:", recaptchaData.score)
          return NextResponse.json(
            {
              success: false,
              error: "Security verification failed. Your activity looks suspicious. Please try again later.",
            },
            { status: 403 },
          )
        }

        console.log(`[Katsumi] WhatsApp reCAPTCHA passed with score: ${recaptchaData.score}`)
      } catch (recaptchaError) {
        console.error("[Katsumi] WhatsApp reCAPTCHA verification error:", recaptchaError)
        return NextResponse.json(
          { success: false, error: "Security service temporarily unavailable. Please try again." },
          { status: 503 },
        )
      }
    }

    if (!phoneNumber || !botName) {
      console.warn("[Katsumi] WhatsApp missing required fields")
      return NextResponse.json({ success: false, error: "Phone number dan bot name diperlukan" }, { status: 400 })
    }

    const phoneRegex = /^\d{1,15}$/
    if (!phoneRegex.test(phoneNumber.replace(/\D/g, ""))) {
      console.warn("[Katsumi] WhatsApp invalid phone format:", phoneNumber)
      return NextResponse.json({ success: false, error: "Format nomor telepon tidak valid" }, { status: 400 })
    }

    const cleanPhoneNumber = phoneNumber.replace(/\D/g, "")
    const botId = `wa_${cleanPhoneNumber}`

    console.log("[Katsumi] Checking existing WhatsApp token...")

    let existingToken
    try {
      const getTimeoutId = setTimeout(() => {
        throw new Error("Firebase timeout pada GET")
      }, 10000)

      existingToken = await tokensCollection.doc(botId).get()
      clearTimeout(getTimeoutId)
    } catch (dbError) {
      console.error("[Katsumi] WhatsApp Firebase GET error:", dbError)
      return NextResponse.json(
        { success: false, error: "Tidak dapat terhubung ke database. Coba lagi dalam beberapa detik." },
        { status: 503 },
      )
    }

    if (existingToken.exists) {
      console.warn("[Katsumi] WhatsApp token already registered:", botId)
      return NextResponse.json({ success: false, error: "Bot WhatsApp sudah terdaftar sebelumnya!" }, { status: 400 })
    }

    const tokenData = {
      phoneNumber: cleanPhoneNumber,
      botId: botId,
      botName: botName,
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastActiveAt: admin.firestore.FieldValue.serverTimestamp(),
      stats: {
        totalMessages: 0,
        totalUsers: 0,
      },
    }

    try {
      const setTimeoutId = setTimeout(() => {
        throw new Error("Firebase timeout pada SET")
      }, 10000)

      await tokensCollection.doc(botId).set(tokenData)
      clearTimeout(setTimeoutId)
    } catch (dbError) {
      console.error("[Katsumi] WhatsApp Firebase SET error:", dbError)
      return NextResponse.json(
        { success: false, error: "Gagal menyimpan token ke database. Coba lagi dalam beberapa detik." },
        { status: 503 },
      )
    }

    console.log(`[Katsumi] WhatsApp bot successfully connected: ${botName} (${cleanPhoneNumber})`)

    await trackBotConnection({
      type: "whatsapp",
      botUsername: botName,
      botId: botId,
      botFirstName: botName,
    }).catch((err) => console.error("[Katsumi] WhatsApp bot connection tracking error:", err))

    return NextResponse.json({
      success: true,
      message: `Bot WhatsApp ${botName} berhasil dihubungkan!`,
      bot: {
        name: botName,
        phoneNumber: cleanPhoneNumber,
        id: botId,
      },
    })
  } catch (error) {
    console.error("[Katsumi] WhatsApp server error:", error instanceof Error ? error.message : String(error))

    let errorMessage = "Terjadi kesalahan server. Silakan coba lagi."

    if (error instanceof Error) {
      if (error.message.includes("Firebase")) {
        errorMessage = "Database error. Coba lagi dalam beberapa detik."
      } else if (error.name === "AbortError") {
        errorMessage = "Request timeout. Please try again."
      }
    }

    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
