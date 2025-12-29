#!/bin/bash
# Setup script untuk Unix/Linux/Mac

echo "╔════════════════════════════════════════╗"
echo "║     🔐 KATSUMI 2FA SETUP WIZARD        ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js tidak ditemukan. Install Node.js terlebih dahulu."
    exit 1
fi

echo "✓ Node.js ditemukan"
echo ""

# Run setup
echo "🔧 Menjalankan 2FA setup..."
node lib/2fa-setup.js

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Setup berhasil!"
    echo ""
    echo "Next steps:"
    echo "  npm run build   # Build dengan 2FA protection"
    echo "  npm start       # Start server dengan 2FA protection"
else
    echo ""
    echo "❌ Setup gagal"
    exit 1
fi
