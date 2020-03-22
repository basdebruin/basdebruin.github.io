#include <FastTouch.h>
#include <Bounce.h>

// makerskills final poster code

// pins to use
const int pins[8] = {23, 22, 21, 20, 19, 18, 17, 16};
int prevValues[8] = {0, 0, 0, 0, 0, 0, 0, 0};

//scaling
const int low = 0;
const int high = 127;

const int switchPoint = 20;


void setup() {
  SerialUSB.begin(9600);

}

void loop() {
  Serial.println("");
  // for each pin
  for (short i = 0; i < 8; i++) {

    int pin = pins[i];
    int prev = prevValues[i];
    //
    int readValue = fastTouchRead(pin);
    //
    Serial.print(readValue);
    Serial.print("\t");
    

    // send midi notes
    if (readValue > switchPoint && prev < switchPoint) {

      // calc velocity
      unsigned int vel = constrain(map(pin, low, high, 0, 127), 0, 127);
      // send on
      usbMIDI.sendNoteOn(36 + i, vel, 1);

      
    } else if (readValue < switchPoint && prev > switchPoint) {

      // send off
      usbMIDI.sendNoteOff(36 + i, 0, 1);
      
    }


    prevValues[i] = readValue;
    
  }
        

  while( usbMIDI.read()) {}
  //
  delay(10);
}
