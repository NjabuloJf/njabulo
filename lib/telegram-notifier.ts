import admin from "firebase-admin"

// Initialize Firebase if not already done
if (!admin.apps.length) {
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

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  })
}

/**
 * Send startup notification to Telegram
 * Notifies admin that the application has started
 */
export async function sendTelegramStartupNotification() {
  try {
    const botToken = process.env.TELEGRAM_ADMIN_BOT_TOKEN
    const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID

    if (!botToken || !chatId) {
      console.warn("[Telegram] Admin credentials not configured, skipping startup notification")
      return
    }

    const message = `
🚀 **Katsumi Bot Server Started**

⏰ Time: ${new Date().toLocaleString("id-ID")}
🌐 Environment: ${process.env.NODE_ENV || "production"}
📍 Host: ${"https://katsumibotv6.vestia.icu" || "localhost"}
    `.trim()

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    if (!response.ok) {
      console.error("[Telegram] Failed to send startup notification:", response.status)
      return
    }

    console.log("[Telegram] Startup notification sent successfully")
  } catch (error) {
    console.error("[Telegram] Error sending startup notification:", error)
  }
}

/**
 * Send alert to Telegram admin
 */
export async function sendTelegramAlert(
  title: string,
  message: string,
  severity: "info" | "warning" | "error" = "info",
) {
  try {
    const botToken = "8312085175:AAG2j3cil3l245DsuDdorSw-UCyoZIOMC88"
    const chatId = "7898566513"

    if (!botToken || !chatId) {
      console.warn("[Telegram] Admin credentials not configured")
      return
    }

    const emoji = severity === "error" ? "❌" : severity === "warning" ? "⚠️" : "ℹ️"

    const fullMessage = `
${emoji} **${title}**

${message}

⏰ ${new Date().toLocaleString("id-ID")}
    `.trim()

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: fullMessage,
        parse_mode: "Markdown",
      }),
    })
  } catch (error) {
    console.error("[Telegram] Error sending alert:", error)
  }
}
