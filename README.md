# 🔐 Starker Passwortgenerator

Ein moderner und sicherer Passwortgenerator mit einer zeitgemäßen, blauen Website-Oberfläche.

## ✨ Features

🎨 **Modernes Design**: Schöne, responsive Website mit blauem Farbschema
🔒 **Sichere Passwörter**: Generiert kryptographisch sichere Zufallspasswörter
⚙️ **Vollständig anpassbar**:
- Längenauswahl (8-64 Zeichen)
- Großbuchstaben (A-Z)
- Kleinbuchstaben (a-z)
- Ziffern (0-9)
- Sonderzeichen (!@#$%...)

📊 **Stärkeanzeige**: Visuelle Stärkeanzeige mit Zahlenwerten
📈 **Passwort-Statistiken**: Zeigt Länge, Kombinationen und eindeutige Zeichen
📋 **Schnell kopierbar**: Ein-Klick-Kopieren in die Zwischenablage
🎯 **Keyboard-Unterstützung**: Enter-Taste zum schnellen Generieren

## 🚀 Schnellstart

### Website-Version (Einfachste Methode)

1. Öffne einfach `index.html` im Browser oder nutze einen lokalen Server:

```bash
# Falls Python installiert ist:
python -m http.server 8000

# Oder mit Node.js (npx):
npx http-server
```

2. Öffne dann im Browser: `http://localhost:8000`

## Verwendung

### So verwendest du die Website

1. **Passwortlänge einstellen**: Schiebe den Slider von 8 bis 64 Zeichen

2. **Zeichentypen wählen**: Aktiviere die gewünschten Checkboxen:
   - ☑️ Großbuchstaben (A-Z)
   - ☑️ Kleinbuchstaben (a-z)
   - ☑️ Ziffern (0-9)
   - ☑️ Sonderzeichen (!@#$%...)

3. **Passwort generieren**: Klick auf "✨ Passwort generieren" oder drücke Enter

4. **Passwort kopieren**: Klick auf das 📋 Button neben dem Passwort

5. **Statistiken anschauen**: Siehe die Länge, Kombinationen und eindeutige Zeichen

6. **Neues generieren**: Klick "🔄 Neues generieren" für ein neues Passwort mit gleichen Einstellungen

7. **Zurücksetzen**: Klick "🗑️ Löschen" zum Leeren des Feldes

## 📊 Passwort-Stärke

Die Website zeigt visuelle Indikatoren für die Passwort-Stärke:

- 🟢🟢 **Sehr Stark**: 80+ Stärkepunkte
- 🟢 **Stark**: 60-80 Punkte
- 🟡 **Mittel**: 40-60 Punkte
- 🟠 **Schwach**: 20-40 Punkte
- 🔴 **Sehr Schwach**: Unter 20 Punkte

## 🔧 Technische Details

Die Website verwendet nur moderne Standard-Web-Technologien:
- **HTML5**: Für die Struktur
- **CSS3**: Für das moderne Design mit Animationen und Gradients
- **JavaScript (ES6+)**: Für die Passwortgenerierung und Interaktion

## 🔒 Sicherheit

⚠️ **Wichtig**: Passwörter werden nur lokal **im Browser** generiert. Sie werden:
- ✅ **Nicht** zu Servern übertragen
- ✅ **Nicht** gespeichert
- ✅ **Nicht** protokolliert
- ✅ **Keine Cookies** oder Tracking

## 📁 Dateien

- `index.html` - Die Hauptseite (Start hier!)
- `style.css` - Modernes Design mit blauer Farbpalette
- `script.js` - JavaScript-Logik für Passwortgenerierung
- `passwort_generator.py` - Alternative Python Desktop-App (optional)
- `requirements.txt` - Python-Abhängigkeiten (optional)

## 💡 Tipps

- **Schneller generieren**: Drücke die Enter-Taste statt auf den Button zu klicken
- **Passwört-Passwort**: Wähle alle 4 Zeichentypen für maximale Sicherheit
- **Lange Passwörter**: 16+ Zeichen ist ideal für wichtige Konten
- **Unterschiedliche Passwörter**: Nutze unterschiedliche Passwörter für verschiedene Dienste

## 📄 Lizenz

Frei verwendbar und modifizierbar.
