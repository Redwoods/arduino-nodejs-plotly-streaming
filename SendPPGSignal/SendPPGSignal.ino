/*
  AnalogReadSerial
 Reads an analog input on pin 0, prints the result to the serial monitor 
 
 This example code is in the public domain.
 */

 #define PPG_INPUT 0

void setup() {
  Serial.begin(9600); // 9600, 115200
}

void loop() {
  int sensorValue = analogRead(PPG_INPUT); // A0

  Serial.println(sensorValue);
  delay(50); // fs = 20 Hz (delay(5) -> fs = 200 Hz ) 
}

