#include "HX711.h"

// Pin configuration
const int LOADCELL_DOUT_PIN = 25; 
const int LOADCELL_SCK_PIN  = 26;

HX711 scale;

// Initial calibration factor (starting value)
// If readings fluctuate too much, try adjusting this value
float calibration_factor = 1044.5; 

void setup() {
  Serial.begin(115200);
  Serial.println(">>> Load Cell Calibration Mode (1kg Load Cell) <<<");
  Serial.println("Initializing...");

  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale();
  scale.tare(); // Reset weight to 0

  Serial.println("---------------------------------------------------");
  Serial.println("1. Place a known weight (e.g., 100g, 500g, or 1000g)");
  Serial.println("2. Observe the value in the Serial Monitor");
  Serial.println("3. Adjust the calibration factor using keys:");
  Serial.println("   [+] or [a] : Increase factor by 10 (coarse)");
  Serial.println("   [-] or [z] : Decrease factor by 10 (coarse)");
  Serial.println("   [*] or [s] : Increase factor by 1 (fine)");
  Serial.println("   [/] or [x] : Decrease factor by 1 (fine)");
  Serial.println("---------------------------------------------------");
}

void loop() {
  scale.set_scale(calibration_factor);

  // Average 5 readings for stability
  float weight = scale.get_units(5);

  Serial.print("Weight: ");
  Serial.print(weight, 1);
  Serial.print(" g"); 
  
  Serial.print("  |  Current Factor: ");
  Serial.print(calibration_factor);
  Serial.println();

  if(Serial.available()) {
    char temp = Serial.read();
    
    // Coarse adjustment
    if(temp == '+' || temp == 'a') calibration_factor += 10;
    else if(temp == '-' || temp == 'z') calibration_factor -= 10;
    
    // Fine adjustment
    else if(temp == '*' || temp == 's') calibration_factor += 1;
    else if(temp == '/' || temp == 'x') calibration_factor -= 1;
  }
  
  delay(50);
}
