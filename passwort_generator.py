import tkinter as tk
from tkinter import ttk, messagebox
import string
import random
import pyperclip

class PasswortGenerator:
    def __init__(self, root):
        self.root = root
        self.root.title("Starker Passwortgenerator")
        self.root.geometry("500x500")
        self.root.resizable(False, False)
        
        # Hauptrahmen
        main_frame = ttk.Frame(root, padding="20")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Titel
        title_label = ttk.Label(main_frame, text="🔐 Starker Passwortgenerator", 
                                font=("Arial", 14, "bold"))
        title_label.grid(row=0, column=0, columnspan=2, pady=10)
        
        # Länge des Passworts
        length_label = ttk.Label(main_frame, text="Passwortlänge:")
        length_label.grid(row=1, column=0, sticky=tk.W, pady=10)
        
        self.length_var = tk.IntVar(value=16)
        length_spinbox = ttk.Spinbox(main_frame, from_=8, to=64, 
                                      textvariable=self.length_var, width=10)
        length_spinbox.grid(row=1, column=1, sticky=tk.W, pady=10)
        
        # Checkbox-Frame
        checkbox_frame = ttk.LabelFrame(main_frame, text="Zeichentypen einschließen:", padding="10")
        checkbox_frame.grid(row=2, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=15)
        
        # Variablen für Checkboxen
        self.uppercase_var = tk.BooleanVar(value=True)
        self.lowercase_var = tk.BooleanVar(value=True)
        self.digits_var = tk.BooleanVar(value=True)
        self.special_var = tk.BooleanVar(value=True)
        
        # Checkboxen
        uppercase_check = ttk.Checkbutton(checkbox_frame, text="Großbuchstaben (A-Z)",
                                          variable=self.uppercase_var)
        uppercase_check.grid(row=0, column=0, sticky=tk.W, pady=5)
        
        lowercase_check = ttk.Checkbutton(checkbox_frame, text="Kleinbuchstaben (a-z)",
                                          variable=self.lowercase_var)
        lowercase_check.grid(row=1, column=0, sticky=tk.W, pady=5)
        
        digits_check = ttk.Checkbutton(checkbox_frame, text="Ziffern (0-9)",
                                       variable=self.digits_var)
        digits_check.grid(row=2, column=0, sticky=tk.W, pady=5)
        
        special_check = ttk.Checkbutton(checkbox_frame, text="Sonderzeichen (!@#$%...)",
                                        variable=self.special_var)
        special_check.grid(row=3, column=0, sticky=tk.W, pady=5)
        
        # Generieren Button
        generate_button = ttk.Button(main_frame, text="Passwort generieren", 
                                     command=self.generate_password)
        generate_button.grid(row=3, column=0, columnspan=2, pady=20, sticky=(tk.W, tk.E))
        
        # Passwort Display
        password_label = ttk.Label(main_frame, text="Generiertes Passwort:")
        password_label.grid(row=4, column=0, sticky=tk.W, pady=(10, 5))
        
        self.password_text = tk.Text(main_frame, height=3, width=55, 
                                     wrap=tk.WORD, font=("Courier", 11))
        self.password_text.grid(row=5, column=0, columnspan=2, pady=5, sticky=(tk.W, tk.E))
        
        # Button-Frame für Aktionen
        button_frame = ttk.Frame(main_frame)
        button_frame.grid(row=6, column=0, columnspan=2, pady=15, sticky=(tk.W, tk.E))
        
        # Kopieren Button
        copy_button = ttk.Button(button_frame, text="📋 Kopieren", 
                                 command=self.copy_to_clipboard)
        copy_button.pack(side=tk.LEFT, padx=5)
        
        # Löschen Button
        clear_button = ttk.Button(button_frame, text="🗑️ Löschen", 
                                  command=self.clear_password)
        clear_button.pack(side=tk.LEFT, padx=5)
        
        # Stärkeanzeige
        strength_label = ttk.Label(main_frame, text="Passwort-Stärke:")
        strength_label.grid(row=7, column=0, sticky=tk.W, pady=(10, 5))
        
        self.strength_var = tk.StringVar(value="")
        strength_display = ttk.Label(main_frame, textvariable=self.strength_var,
                                     font=("Arial", 11, "bold"))
        strength_display.grid(row=7, column=1, sticky=tk.W, pady=(10, 5))
    
    def generate_password(self):
        # Überprüfe, dass mindestens eine Option ausgewählt ist
        if not any([self.uppercase_var.get(), self.lowercase_var.get(),
                    self.digits_var.get(), self.special_var.get()]):
            messagebox.showwarning("Fehler", 
                                  "Bitte wähle mindestens einen Zeichentyp aus!")
            return
        
        # Erstelle die Zeichenmenge basierend auf Auswahl
        characters = ""
        if self.uppercase_var.get():
            characters += string.ascii_uppercase
        if self.lowercase_var.get():
            characters += string.ascii_lowercase
        if self.digits_var.get():
            characters += string.digits
        if self.special_var.get():
            characters += "!@#$%^&*()_+-=[]{}|;:,.<>?"
        
        # Generiere Passwort
        password_length = self.length_var.get()
        password = ''.join(random.choice(characters) for _ in range(password_length))
        
        # Zeige Passwort an
        self.password_text.delete('1.0', tk.END)
        self.password_text.insert('1.0', password)
        
        # Berechne Stärke
        self.calculate_strength(password, characters)
    
    def calculate_strength(self, password, character_set):
        """Berechnet die Passwort-Stärke"""
        length = len(password)
        unique_chars = len(set(password))
        possible_chars = len(character_set)
        
        # Vereinfachte Stärkebewertung
        if length >= 16 and possible_chars >= 80 and unique_chars >= 8:
            strength = "🟢 Sehr Stark"
            color = "green"
        elif length >= 12 and possible_chars >= 60 and unique_chars >= 6:
            strength = "🟡 Stark"
            color = "orange"
        elif length >= 8 and possible_chars >= 40:
            strength = "🟠 Mittel"
            color = "orange"
        else:
            strength = "🔴 Schwach"
            color = "red"
        
        self.strength_var.set(strength)
    
    def copy_to_clipboard(self):
        """Kopiert das Passwort in die Zwischenablage"""
        password = self.password_text.get('1.0', tk.END).strip()
        if password:
            try:
                pyperclip.copy(password)
                messagebox.showinfo("Erfolg", "Passwort in die Zwischenablage kopiert!")
            except Exception as e:
                messagebox.showerror("Fehler", f"Fehler beim Kopieren: {e}")
        else:
            messagebox.showwarning("Fehler", "Kein Passwort zum Kopieren vorhanden!")
    
    def clear_password(self):
        """Löscht das angezeigte Passwort"""
        self.password_text.delete('1.0', tk.END)
        self.strength_var.set("")

def main():
    root = tk.Tk()
    app = PasswortGenerator(root)
    root.mainloop()

if __name__ == "__main__":
    main()
