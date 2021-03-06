EESchema Schematic File Version 4
EELAYER 26 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L Connector_Generic:Conn_01x08 J1
U 1 1 5A8CC39C
P 1300 1650
F 0 "J1" H 1380 1642 50  0000 L CNN
F 1 "HID Reader" H 1380 1551 50  0000 L CNN
F 2 "TerminalBlock_Phoenix_PTSM:TerminalBlock_Phoenix_PTSM-0,5-8-HV-2.5-SMD_1x08_P2.50mm_Vertical" H 1300 1650 50  0001 C CNN
F 3 "~" H 1300 1650 50  0001 C CNN
F 4 "https://media.digikey.com/pdf/Data%20Sheets/Phoenix%20Contact%20PDFs/1771088.pdf" H 1300 1650 50  0001 C CNN "Datasheet Link"
F 5 "Phoenix Contact" H 1300 1650 50  0001 C CNN "MFN"
F 6 "1771088 " H 1300 1650 50  0001 C CNN "MFP"
F 7 "277-2071-1-ND" H 1300 1650 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/phoenix-contact/1771088/277-2071-1-ND/2192481" H 1300 1650 50  0001 C CNN "S1PL"
	1    1300 1650
	-1   0    0    1   
$EndComp
$Comp
L Connector_Generic:Conn_01x02 J2
U 1 1 5A8CC48A
P 10350 1600
F 0 "J2" H 10429 1592 50  0000 L CNN
F 1 "Interlock" H 10429 1501 50  0000 L CNN
F 2 "TerminalBlock_Phoenix_PTSM:TerminalBlock_Phoenix_PTSM-0,5-2-HV-2.5-SMD_1x02_P2.50mm_Vertical" H 10350 1600 50  0001 C CNN
F 3 "~" H 10350 1600 50  0001 C CNN
F 4 "https://media.digikey.com/PDF/Data%20Sheets/Phoenix%20Contact%20PDFs/1778764.pdf" H 10350 1600 50  0001 C CNN "Datasheet Link"
F 5 "Phoenix Contact" H 10350 1600 50  0001 C CNN "MFN"
F 6 "1778764 " H 10350 1600 50  0001 C CNN "MFP"
F 7 "277-2315-1-ND" H 10350 1600 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/phoenix-contact/1778764/277-2315-1-ND/2625585" H 10350 1600 50  0001 C CNN "S1PL"
	1    10350 1600
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x04 J3
U 1 1 5A8CC55D
P 10350 2450
F 0 "J3" H 10429 2442 50  0000 L CNN
F 1 "Motors" H 10429 2351 50  0000 L CNN
F 2 "TerminalBlock_Phoenix_PTSM:TerminalBlock_Phoenix_PTSM-0,5-4-HV-2.5-SMD_1x06_P2.50mm_Vertical" H 10350 2450 50  0001 C CNN
F 3 "~" H 10350 2450 50  0001 C CNN
F 4 "https://media.digikey.com/PDF/Data%20Sheets/Phoenix%20Contact%20PDFs/1778780.pdf" H 10350 2450 50  0001 C CNN "Datasheet Link"
F 5 "Phoenix Contact" H 10350 2450 50  0001 C CNN "MFN"
F 6 "1778780 " H 10350 2450 50  0001 C CNN "MFP"
F 7 "277-2317-1-ND" H 10350 2450 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/phoenix-contact/1778780/277-2317-1-ND/2625587" H 10350 2450 50  0001 C CNN "S1PL"
	1    10350 2450
	1    0    0    -1  
$EndComp
$Comp
L Relay_SolidState:ASSR-1218 U2
U 1 1 5A8CCB95
P 8250 1650
F 0 "U2" H 8250 1975 50  0000 C CNN
F 1 "ASSR-1218" H 8250 1884 50  0000 C CNN
F 2 "Housings_SOIC:SO-4_4.4x4.3mm_Pitch2.54mm" H 8050 1450 50  0001 L CIN
F 3 "" H 8200 1650 50  0001 L CNN
F 4 "http://www.vishay.com/docs/84724/vo1400aeftr.pdf" H 8250 1650 50  0001 C CNN "Datasheet Link"
F 5 "Broadcom Limited" H 8250 1650 50  0001 C CNN "MFN"
F 6 "ASSR-1218-003E " H 8250 1650 50  0001 C CNN "MFP"
F 7 "516-2189-5-ND" H 8250 1650 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/broadcom-limited/ASSR-1218-003E/516-2189-5-ND/2211230" H 8250 1650 50  0001 C CNN "S1PL"
	1    8250 1650
	1    0    0    -1  
$EndComp
Wire Wire Line
	8550 1550 8700 1550
Wire Wire Line
	8700 1550 8700 1600
Wire Wire Line
	8700 1600 10150 1600
Wire Wire Line
	8550 1750 8700 1750
Wire Wire Line
	8700 1750 8700 1700
Wire Wire Line
	8700 1700 10150 1700
Text Label 10150 1600 2    50   ~ 0
Interlock_L
Text Label 10150 1700 2    50   ~ 0
Interlock_H
$Comp
L power:+5V #PWR03
U 1 1 5A8CD133
P 5500 6400
F 0 "#PWR03" H 5500 6250 50  0001 C CNN
F 1 "+5V" H 5515 6573 50  0000 C CNN
F 2 "" H 5500 6400 50  0001 C CNN
F 3 "" H 5500 6400 50  0001 C CNN
	1    5500 6400
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR02
U 1 1 5A8CD1CC
P 5000 7200
F 0 "#PWR02" H 5000 6950 50  0001 C CNN
F 1 "GND" H 5005 7027 50  0000 C CNN
F 2 "" H 5000 7200 50  0001 C CNN
F 3 "" H 5000 7200 50  0001 C CNN
	1    5000 7200
	1    0    0    -1  
$EndComp
Text Label 10150 2350 2    50   ~ 0
MotorX_L
Text Label 10150 2450 2    50   ~ 0
MotorX_H
Text Label 10150 2550 2    50   ~ 0
MotorY_L
Text Label 10150 2650 2    50   ~ 0
MotorY_H
$Comp
L power:+3.3V #PWR01
U 1 1 5A8CEA2C
P 4550 6400
F 0 "#PWR01" H 4550 6250 50  0001 C CNN
F 1 "+3.3V" H 4565 6573 50  0000 C CNN
F 2 "" H 4550 6400 50  0001 C CNN
F 3 "" H 4550 6400 50  0001 C CNN
	1    4550 6400
	1    0    0    -1  
$EndComp
Text Label 5350 1400 0    50   ~ 0
GND
Text Label 3250 1400 2    50   ~ 0
GND
Text Label 3250 1700 2    50   ~ 0
GND
NoConn ~ 3250 1800
NoConn ~ 3250 1900
NoConn ~ 3250 3100
NoConn ~ 3250 2900
NoConn ~ 3250 2700
NoConn ~ 3250 2600
NoConn ~ 3250 2500
NoConn ~ 3250 2300
NoConn ~ 5350 2600
NoConn ~ 5350 2700
NoConn ~ 5350 2800
NoConn ~ 3250 2100
NoConn ~ 3250 2000
NoConn ~ 5350 1700
NoConn ~ 5350 1800
NoConn ~ 5350 1900
NoConn ~ 5350 2000
NoConn ~ 5350 2100
NoConn ~ 5350 2200
Text Label 5000 7050 2    50   ~ 0
GND
Text Label 6800 1150 2    50   ~ 0
Interlock_Safe
Text Label 5350 3100 0    50   ~ 0
Interlock_Safe
Text Label 3250 3000 2    50   ~ 0
Red_LED
Text Label 3250 2800 2    50   ~ 0
Green_LED
Text Label 3250 2400 2    50   ~ 0
Beeper
Text Label 3250 2200 2    50   ~ 0
Read_Hold
Text Label 7950 1750 2    50   ~ 0
GND
Text Label 1500 1250 0    50   ~ 0
GND
Text Label 5350 1500 0    50   ~ 0
5V
Text Label 5350 1600 0    50   ~ 0
3.3V
Text Label 3250 1500 2    50   ~ 0
5V
Text Label 3250 1600 2    50   ~ 0
3.3V
Text Label 1500 1950 0    50   ~ 0
5V
Text Label 4550 6500 2    50   ~ 0
3.3V
Text Label 5500 6500 2    50   ~ 0
5V
Text Label 2300 1850 0    50   ~ 0
Beeper
Text Label 2300 1750 0    50   ~ 0
Red_LED
Text Label 2300 1650 0    50   ~ 0
Green_LED
Text Label 2300 1550 0    50   ~ 0
Read_Hold
Text Label 2300 1450 0    50   ~ 0
DATA0
Text Label 2300 1350 0    50   ~ 0
DATA1
Text Label 5350 2300 0    50   ~ 0
DATA0
Text Label 5350 2400 0    50   ~ 0
DATA1
Text Label 5350 3000 0    50   ~ 0
MotorX_Safe
Text Label 5350 2900 0    50   ~ 0
MotorY_Safe
$Comp
L Device:C C5
U 1 1 5A8D8C9E
P 7250 2450
F 0 "C5" H 7365 2496 50  0000 L CNN
F 1 "0.1uF" H 7365 2405 50  0000 L CNN
F 2 "Capacitors_SMD:C_0603" H 7288 2300 50  0001 C CNN
F 3 "" H 7250 2450 50  0001 C CNN
F 4 "https://api.kemet.com/component-edge/download/specsheet/C0603C104K5RACAUTO.pdf" H 7250 2450 50  0001 C CNN "Datasheet Link"
F 5 "KEMET" H 7250 2450 50  0001 C CNN "MFN"
F 6 "C0603C104K5RACAUTO " H 7250 2450 50  0001 C CNN "MFP"
F 7 "399-6856-1-ND" H 7250 2450 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/kemet/C0603C104K5RACAUTO/399-6856-1-ND/3314369" H 7250 2450 50  0001 C CNN "S1PL"
	1    7250 2450
	1    0    0    -1  
$EndComp
Text Label 6800 2500 2    50   ~ 0
MotorY_Safe
Text Label 6800 2400 2    50   ~ 0
MotorX_Safe
Text Label 9000 4850 0    50   ~ 0
GND
Text Label 9000 4950 0    50   ~ 0
GND
Text Label 9000 5050 0    50   ~ 0
Interlock_H
Text Label 9000 4750 0    50   ~ 0
Interlock_L
Text Label 7500 4750 2    50   ~ 0
MotorX_L
Text Label 7500 4850 2    50   ~ 0
MotorX_H
Text Label 7500 4950 2    50   ~ 0
MotorY_L
Text Label 7500 5050 2    50   ~ 0
MotorY_H
Wire Wire Line
	7400 1150 6800 1150
Wire Notes Line
	6950 600  6950 5600
Wire Notes Line
	6950 5600 9550 5600
Wire Notes Line
	9550 5600 9550 600 
Wire Notes Line
	9550 600  6950 600 
Text Notes 7000 750  0    79   ~ 0
Input Protection, Isolation
Wire Notes Line
	9650 600  9650 5600
Wire Notes Line
	11100 600  9650 600 
Text Notes 9700 750  0    79   ~ 0
Machine Connections
Wire Notes Line
	9650 5600 11100 5600
Wire Notes Line
	11100 5600 11100 600 
Wire Notes Line
	600  600  600  5600
Wire Notes Line
	2050 600  600  600 
Text Notes 650  750  0    79   ~ 0
RFID Reader
Wire Notes Line
	600  5600 2050 5600
Wire Wire Line
	1500 1850 2300 1850
Wire Wire Line
	1500 1750 2300 1750
Wire Wire Line
	2300 1650 1500 1650
Wire Wire Line
	1500 1550 2300 1550
Wire Wire Line
	2300 1450 1500 1450
Wire Wire Line
	1500 1350 2300 1350
Wire Notes Line
	2150 600  6850 600 
Wire Notes Line
	6850 600  6850 5600
Wire Notes Line
	6850 5600 2150 5600
Wire Notes Line
	2150 5600 2150 600 
Text Notes 2200 750  0    79   ~ 0
Microcontroller, OLED Display
$Comp
L TLP2161:TLP2161 U3
U 1 1 5A904523
P 8250 2450
F 0 "U3" H 8250 1935 50  0000 C CNN
F 1 "TLP2161" H 8250 2026 50  0000 C CNN
F 2 "Housings_SOIC:SOIC-8_3.9x4.9mm_Pitch1.27mm" H 8250 2450 50  0001 C CNN
F 3 "" H 8250 2450 50  0001 C CNN
F 4 "https://toshiba.semicon-storage.com/info/docget.jsp?did=14455&prodName=TLP2161" H 8250 2450 50  0001 C CNN "Datasheet Link"
F 5 "Toshiba Semiconductor and Storage" H 8250 2450 50  0001 C CNN "MFN"
F 6 "TLP2161(F)" H 8250 2450 50  0001 C CNN "MFP"
F 7 "TLP2161(F)-ND" H 8250 2450 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/toshiba-semiconductor-and-storage/TLP2161(F)/TLP2161(F)-ND/5189879" H 8250 2450 50  0001 C CNN "S1PL"
	1    8250 2450
	-1   0    0    1   
$EndComp
Wire Wire Line
	9000 2400 9150 2400
Wire Wire Line
	9500 2400 9500 2350
Wire Wire Line
	9500 2350 10150 2350
Wire Wire Line
	9000 2300 9050 2300
Wire Wire Line
	9400 2450 10150 2450
Wire Wire Line
	9000 2500 9150 2500
Wire Wire Line
	9500 2500 9500 2550
Wire Wire Line
	9500 2550 10150 2550
Wire Wire Line
	9000 2600 9050 2600
Wire Wire Line
	7500 2300 7250 2300
Wire Wire Line
	7500 2600 7250 2600
Wire Wire Line
	6800 2400 7500 2400
Wire Wire Line
	7500 2500 6800 2500
$Comp
L SMDA15-6:SMDA15-6 U4
U 1 1 5A908DD1
P 8250 4900
F 0 "U4" H 8250 5415 50  0000 C CNN
F 1 "SMDA15-6" H 8250 5324 50  0000 C CNN
F 2 "Housings_SOIC:SOIC-8_3.9x4.9mm_Pitch1.27mm" H 8250 4900 50  0001 C CNN
F 3 "" H 8250 4900 50  0001 C CNN
F 4 "http://www.smc-diodes.com/propdf/SMDA03-6%20THRU%20SMDA24-6%20N0295%20REV.A.pdf" H 8250 4900 50  0001 C CNN "Datasheet Link"
F 5 "SMC Diode Solutions" H 8250 4900 50  0001 C CNN "MFN"
F 6 "SMDA15-6TR" H 8250 4900 50  0001 C CNN "MFP"
F 7 "1655-1915-1-ND" H 8250 4900 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/smc-diode-solutions/SMDA15-6TR/1655-1915-1-ND/8019617" H 8250 4900 50  0001 C CNN "S1PL"
	1    8250 4900
	1    0    0    -1  
$EndComp
$Comp
L Device:C C2
U 1 1 5A90D87B
P 4800 6750
F 0 "C2" H 4918 6796 50  0000 L CNN
F 1 "10uF" H 4918 6705 50  0000 L CNN
F 2 "Capacitors_SMD:C_1206" H 4838 6600 50  0001 C CNN
F 3 "" H 4800 6750 50  0001 C CNN
F 4 "https://api.kemet.com/component-edge/download/datasheet/T491A106M020AT.pdf" H 4800 6750 50  0001 C CNN "Datasheet Link"
F 5 "KEMET" H 4800 6750 50  0001 C CNN "MFN"
F 6 "T491A106M020AT  " H 4800 6750 50  0001 C CNN "MFP"
F 7 "399-5152-1-ND" H 4800 6750 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/kemet/T491A106M020AT/399-5152-1-ND/1739488" H 4800 6750 50  0001 C CNN "S1PL"
	1    4800 6750
	1    0    0    -1  
$EndComp
$Comp
L Device:C C3
U 1 1 5A90D930
P 5250 6750
F 0 "C3" H 5368 6796 50  0000 L CNN
F 1 "10uF" H 5368 6705 50  0000 L CNN
F 2 "Capacitors_SMD:C_1206" H 5288 6600 50  0001 C CNN
F 3 "" H 5250 6750 50  0001 C CNN
F 4 "https://api.kemet.com/component-edge/download/datasheet/T491A106M020AT.pdf" H 5250 6750 50  0001 C CNN "Datasheet Link"
F 5 "KEMET" H 5250 6750 50  0001 C CNN "MFN"
F 6 "T491A106M020AT " H 5250 6750 50  0001 C CNN "MFP"
F 7 "399-5152-1-ND" H 5250 6750 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/kemet/T491A106M020AT/399-5152-1-ND/1739488" H 5250 6750 50  0001 C CNN "S1PL"
	1    5250 6750
	1    0    0    -1  
$EndComp
Wire Wire Line
	4550 6400 4550 6500
Wire Wire Line
	5250 6600 5250 6500
Wire Wire Line
	5000 7200 5000 7050
Wire Wire Line
	4800 7050 4800 6900
Wire Wire Line
	5250 7050 5250 6900
Wire Wire Line
	4800 7050 5000 7050
Wire Wire Line
	5000 7050 5250 7050
Connection ~ 5000 7050
$Comp
L Device:C C1
U 1 1 5A913F98
P 4300 6750
F 0 "C1" H 4415 6796 50  0000 L CNN
F 1 "0.1uF" H 4415 6705 50  0000 L CNN
F 2 "Capacitors_SMD:C_0603" H 4338 6600 50  0001 C CNN
F 3 "" H 4300 6750 50  0001 C CNN
F 4 "https://api.kemet.com/component-edge/download/specsheet/C0603C104K5RACAUTO.pdf" H 4300 6750 50  0001 C CNN "Datasheet Link"
F 5 "KEMET" H 4300 6750 50  0001 C CNN "MFN"
F 6 "C0603C104K5RACAUTO " H 4300 6750 50  0001 C CNN "MFP"
F 7 "399-6856-1-ND" H 4300 6750 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/kemet/C0603C104K5RACAUTO/399-6856-1-ND/3314369" H 4300 6750 50  0001 C CNN "S1PL"
	1    4300 6750
	1    0    0    -1  
$EndComp
$Comp
L Device:C C4
U 1 1 5A91400E
P 5750 6750
F 0 "C4" H 5865 6796 50  0000 L CNN
F 1 "0.1uF" H 5865 6705 50  0000 L CNN
F 2 "Capacitors_SMD:C_0603" H 5788 6600 50  0001 C CNN
F 3 "" H 5750 6750 50  0001 C CNN
F 4 "https://api.kemet.com/component-edge/download/specsheet/C0603C104K5RACAUTO.pdf" H 5750 6750 50  0001 C CNN "Datasheet Link"
F 5 "KEMET" H 5750 6750 50  0001 C CNN "MFN"
F 6 "C0603C104K5RACAUTO " H 5750 6750 50  0001 C CNN "MFP"
F 7 "399-6856-1-ND" H 5750 6750 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/kemet/C0603C104K5RACAUTO/399-6856-1-ND/3314369" H 5750 6750 50  0001 C CNN "S1PL"
	1    5750 6750
	1    0    0    -1  
$EndComp
Wire Wire Line
	5250 6500 5500 6500
Wire Wire Line
	5500 6500 5500 6400
Wire Wire Line
	5750 6600 5750 6500
Wire Wire Line
	5750 6500 5500 6500
Connection ~ 5500 6500
Wire Wire Line
	5750 6900 5750 7050
Wire Wire Line
	5750 7050 5250 7050
Connection ~ 5250 7050
Wire Wire Line
	4800 7050 4300 7050
Wire Wire Line
	4300 7050 4300 6900
Connection ~ 4800 7050
Wire Wire Line
	4300 6600 4300 6500
Wire Wire Line
	4300 6500 4550 6500
Wire Wire Line
	4550 6500 4800 6500
Wire Wire Line
	4800 6500 4800 6600
Connection ~ 4550 6500
$Comp
L iClass_SE_R10:iClass_SE_R10_Backplate MNT1
U 1 1 5A91F017
P 1350 3550
F 0 "MNT1" H 1878 3618 79  0000 L CNN
F 1 "iClass_SE_R10_Backplate" H 1878 3483 79  0000 L CNN
F 2 "iClass_SE_R10:iClass_SE_R10_Backplate" H 1350 3550 79  0001 C CNN
F 3 "" H 1350 3550 79  0001 C CNN
F 4 "https://www.hidglobal.com/doclib/files/resource_files/plt-01579-a.4_iclass_se_multiclass_se_installaton_guide.pdf" H 1350 3550 50  0001 C CNN "Datasheet Link"
F 5 "HID" H 1350 3550 50  0001 C CNN "MFN"
F 6 "iClass SE R10" H 1350 3550 50  0001 C CNN "MFP"
F 7 "hid iclass se r10" H 1350 3550 50  0001 C CNN "S1PN"
F 8 "https://www.ebay.com/sch/i.html?_nkw=hid+iclass+se+r10&_sop=15" H 1350 3550 50  0001 C CNN "S1PL"
F 9 "Y" H 1350 3550 50  0001 C CNN "Critical"
	1    1350 3550
	1    0    0    -1  
$EndComp
Text Label 7500 2300 2    50   ~ 0
GND
Text Label 7500 2600 2    50   ~ 0
3.3V
$Comp
L ESP32_TTGO:ESP32_TTGO U1
U 1 1 5A8E416B
P 4300 2250
F 0 "U1" H 4300 3465 50  0000 C CNN
F 1 "ESP32_TTGO" H 4300 3374 50  0000 C CNN
F 2 "ESP32_TTGO:ESP32_TTGO" H 4300 2250 50  0001 C CNN
F 3 "DOCUMENTATION" H 4300 2250 50  0001 C CNN
F 4 "TTGO" H 4300 2250 50  0001 C CNN "MFN"
F 5 "TTGO ESP32 LoRa SX1278 OLED module" H 4300 2250 50  0001 C CNN "MFP"
F 6 "esp32 ttgo oled lora" H 4300 2250 50  0001 C CNN "S1PN"
F 7 "https://www.ebay.com/sch/i.html?_nkw=esp32+ttgo+oled+lora&_sop=15" H 4300 2250 50  0001 C CNN "S1PL"
F 8 "Y" H 4300 2250 50  0001 C CNN "Critical"
F 9 "MUST de-solder SX1276 IC & remove pin 12" H 4300 2250 50  0001 C CNN "Notes"
	1    4300 2250
	1    0    0    -1  
$EndComp
$Comp
L Mechanical:MountingHole MK1
U 1 1 5A8E23EC
P 1000 6200
F 0 "MK1" H 1100 6246 50  0000 L CNN
F 1 "Mounting_Hole" H 1100 6155 50  0000 L CNN
F 2 "Mounting_Holes:MountingHole_3.2mm_M3" H 1000 6200 50  0001 C CNN
F 3 "" H 1000 6200 50  0001 C CNN
	1    1000 6200
	1    0    0    -1  
$EndComp
$Comp
L Mechanical:MountingHole MK2
U 1 1 5A8E245F
P 1000 6450
F 0 "MK2" H 1100 6496 50  0000 L CNN
F 1 "Mounting_Hole" H 1100 6405 50  0000 L CNN
F 2 "Mounting_Holes:MountingHole_3.2mm_M3" H 1000 6450 50  0001 C CNN
F 3 "" H 1000 6450 50  0001 C CNN
	1    1000 6450
	1    0    0    -1  
$EndComp
$Comp
L Mechanical:MountingHole MK3
U 1 1 5A8E2490
P 1000 6700
F 0 "MK3" H 1100 6746 50  0000 L CNN
F 1 "Mounting_Hole" H 1100 6655 50  0000 L CNN
F 2 "Mounting_Holes:MountingHole_3.2mm_M3" H 1000 6700 50  0001 C CNN
F 3 "" H 1000 6700 50  0001 C CNN
	1    1000 6700
	1    0    0    -1  
$EndComp
$Comp
L Mechanical:MountingHole MK4
U 1 1 5A8E24C5
P 1000 6950
F 0 "MK4" H 1100 6996 50  0000 L CNN
F 1 "Mounting_Hole" H 1100 6905 50  0000 L CNN
F 2 "Mounting_Holes:MountingHole_3.2mm_M3" H 1000 6950 50  0001 C CNN
F 3 "" H 1000 6950 50  0001 C CNN
	1    1000 6950
	1    0    0    -1  
$EndComp
Wire Notes Line
	600  5700 600  7650
Wire Notes Line
	2050 5700 600  5700
Text Notes 650  5900 0    79   ~ 0
Mounting Holes
Wire Notes Line
	600  7650 2050 7650
Wire Notes Line
	2150 5700 6850 5700
Wire Notes Line
	2150 7650 2150 5700
Text Notes 2200 5900 0    79   ~ 0
Power Supply, Conditioning
Wire Notes Line
	2050 7650 2050 5700
Wire Notes Line
	2050 5600 2050 600 
Wire Notes Line
	6850 5700 6850 7650
Wire Notes Line
	6850 7650 2150 7650
$Comp
L Connector:Barrel_Jack_Switch J4
U 1 1 5A900A58
P 2850 6750
F 0 "J4" H 2928 7075 50  0000 C CNN
F 1 "Barrel_Jack" H 2928 6984 50  0000 C CNN
F 2 "Connectors:Barrel_Jack_CUI_PJ-036AH-SMT" H 2900 6710 50  0001 C CNN
F 3 "~" H 2900 6710 50  0001 C CNN
F 4 "https://www.cui.com/product/resource/digikeypdf/pj-036ah-smt-tr.pdf" H 2850 6750 50  0001 C CNN "Datasheet Link"
F 5 "CUI Inc." H 2850 6750 50  0001 C CNN "MFN"
F 6 "PJ-036AH-SMT-TR" H 2850 6750 50  0001 C CNN "MFP"
F 7 "CP-036AHPJCT-ND" H 2850 6750 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/cui-inc/PJ-036AH-SMT-TR/CP-036AHPJCT-ND/1530994" H 2850 6750 50  0001 C CNN "S1PL"
	1    2850 6750
	1    0    0    -1  
$EndComp
Text Label 3150 6650 0    50   ~ 0
5V
Text Label 3150 6750 0    50   ~ 0
GND
Text Label 3150 6850 0    50   ~ 0
GND
$Comp
L Device:R R2
U 1 1 5A8F8E59
P 7400 1750
F 0 "R2" H 7470 1796 50  0000 L CNN
F 1 "IR2" H 7470 1705 50  0000 L CNN
F 2 "Resistors_SMD:R_0603" V 7330 1750 50  0001 C CNN
F 3 "" H 7400 1750 50  0001 C CNN
	1    7400 1750
	1    0    0    -1  
$EndComp
$Comp
L Device:R R1
U 1 1 5A8F8EAC
P 7400 1350
F 0 "R1" H 7470 1396 50  0000 L CNN
F 1 "IR1" H 7470 1305 50  0000 L CNN
F 2 "Resistors_SMD:R_0603" V 7330 1350 50  0001 C CNN
F 3 "" H 7400 1350 50  0001 C CNN
	1    7400 1350
	1    0    0    -1  
$EndComp
Wire Wire Line
	7400 1150 7400 1200
Wire Wire Line
	7400 1500 7400 1550
Wire Wire Line
	7950 1550 7400 1550
Connection ~ 7400 1550
Wire Wire Line
	7400 1550 7400 1600
Text Label 7400 1950 2    50   ~ 0
GND
Wire Wire Line
	7400 1950 7400 1900
$Comp
L Device:R R4
U 1 1 5A914A94
P 9150 2700
F 0 "R4" H 9080 2654 50  0000 R CNN
F 1 "680" H 9080 2745 50  0000 R CNN
F 2 "Resistors_SMD:R_0603" V 9080 2700 50  0001 C CNN
F 3 "" H 9150 2700 50  0001 C CNN
F 4 "http://www.yageo.com/documents/recent/PYu-RT_1-to-0.01_RoHS_L_9.pdf" H 9150 2700 50  0001 C CNN "Datasheet Link"
F 5 "Yageo" H 9150 2700 50  0001 C CNN "MFN"
F 6 "RT0603FRE07680RL " H 9150 2700 50  0001 C CNN "MFP"
F 7 "YAG3356CT-ND" H 9150 2700 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/yageo/RT0603FRE07680RL/YAG3356CT-ND/5418061" H 9150 2700 50  0001 C CNN "S1PL"
	1    9150 2700
	-1   0    0    1   
$EndComp
$Comp
L Device:R R3
U 1 1 5A914C23
P 9150 2200
F 0 "R3" H 9080 2154 50  0000 R CNN
F 1 "680" H 9080 2245 50  0000 R CNN
F 2 "Resistors_SMD:R_0603" V 9080 2200 50  0001 C CNN
F 3 "" H 9150 2200 50  0001 C CNN
F 4 "http://www.yageo.com/documents/recent/PYu-RT_1-to-0.01_RoHS_L_9.pdf" H 9150 2200 50  0001 C CNN "Datasheet Link"
F 5 "Yageo" H 9150 2200 50  0001 C CNN "MFN"
F 6 "RT0603FRE07680RL" H 9150 2200 50  0001 C CNN "MFP"
F 7 "YAG3356CT-ND" H 9150 2200 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/yageo/RT0603FRE07680RL/YAG3356CT-ND/5418061" H 9150 2200 50  0001 C CNN "S1PL"
	1    9150 2200
	-1   0    0    1   
$EndComp
Wire Wire Line
	9150 2400 9150 2350
Connection ~ 9150 2400
Wire Wire Line
	9150 2400 9500 2400
Wire Wire Line
	9150 2500 9150 2550
Connection ~ 9150 2500
Wire Wire Line
	9150 2500 9500 2500
Wire Wire Line
	9150 2850 9150 2900
Wire Wire Line
	9150 2900 9400 2900
Wire Wire Line
	9450 2650 10150 2650
Wire Wire Line
	9050 2600 9050 2900
Wire Wire Line
	9050 2900 9150 2900
Connection ~ 9150 2900
Wire Wire Line
	9050 2300 9050 2000
Wire Wire Line
	9050 2000 9150 2000
Wire Wire Line
	9150 2000 9150 2050
Wire Wire Line
	9400 2000 9150 2000
Connection ~ 9150 2000
$Comp
L Device:R R5
U 1 1 5A92D63A
P 9400 2200
F 0 "R5" H 9330 2154 50  0000 R CNN
F 1 "470" H 9330 2245 50  0000 R CNN
F 2 "Resistors_SMD:R_0603" V 9330 2200 50  0001 C CNN
F 3 "" H 9400 2200 50  0001 C CNN
F 4 "http://www.yageo.com/documents/recent/PYu-RC_Group_51_RoHS_L_10.pdf" H 9400 2200 50  0001 C CNN "Datasheet Link"
F 5 "Yageo" H 9400 2200 50  0001 C CNN "MFN"
F 6 "RC0603FR-07470RL" H 9400 2200 50  0001 C CNN "MFP"
F 7 "311-470HRCT-ND" H 9400 2200 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/yageo/RC0603FR-07470RL/311-470HRCT-ND/730203" H 9400 2200 50  0001 C CNN "S1PL"
	1    9400 2200
	-1   0    0    1   
$EndComp
Wire Wire Line
	9400 2000 9400 2050
Wire Wire Line
	9400 2350 9400 2450
$Comp
L Device:R R6
U 1 1 5A92FE38
P 9400 2700
F 0 "R6" H 9330 2654 50  0000 R CNN
F 1 "470" H 9330 2745 50  0000 R CNN
F 2 "Resistors_SMD:R_0603" V 9330 2700 50  0001 C CNN
F 3 "" H 9400 2700 50  0001 C CNN
F 4 "http://www.yageo.com/documents/recent/PYu-RC_Group_51_RoHS_L_10.pdf" H 9400 2700 50  0001 C CNN "Datasheet Link"
F 5 "Yageo" H 9400 2700 50  0001 C CNN "MFN"
F 6 "RC0603FR-07470RL" H 9400 2700 50  0001 C CNN "MFP"
F 7 "311-470HRCT-ND" H 9400 2700 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/yageo/RC0603FR-07470RL/311-470HRCT-ND/730203" H 9400 2700 50  0001 C CNN "S1PL"
	1    9400 2700
	-1   0    0    1   
$EndComp
Wire Wire Line
	9400 2900 9400 2850
Wire Wire Line
	9400 2550 9450 2550
Wire Wire Line
	9450 2550 9450 2650
$Comp
L Connector_Generic:Conn_01x03 J5
U 1 1 5AA0340C
P 10350 3400
F 0 "J5" H 10430 3442 50  0000 L CNN
F 1 "Relay" H 10430 3351 50  0000 L CNN
F 2 "Connectors_Phoenix:PhoenixContact_PTSM0,5_3-HV-2,5_SMD" H 10350 3400 50  0001 C CNN
F 3 "~" H 10350 3400 50  0001 C CNN
F 4 "https://media.digikey.com/PDF/Data%20Sheets/Phoenix%20Contact%20PDFs/1778777.pdf" H 10350 3400 50  0001 C CNN "Datasheet Link"
F 5 "Phoenix Contact" H 10350 3400 50  0001 C CNN "MFN"
F 6 "1778777 " H 10350 3400 50  0001 C CNN "MFP"
F 7 "277-2316-1-ND" H 10350 3400 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/phoenix-contact/1778777/277-2316-1-ND/2625586" H 10350 3400 50  0001 C CNN "S1PL"
	1    10350 3400
	1    0    0    -1  
$EndComp
Text Label 10150 3400 2    50   ~ 0
GND
Text Label 10150 3500 2    50   ~ 0
GND
Wire Wire Line
	10150 3300 6800 3300
Text Label 6800 3300 2    50   ~ 0
Relay
Text Label 10150 3300 2    50   ~ 0
Relay
Text Label 5350 2500 0    50   ~ 0
Relay
$Comp
L Connector_Generic:Conn_01x02 CON1
U 1 1 5C46308C
P 10350 1950
F 0 "CON1" H 10429 1942 50  0000 L CNN
F 1 "Interlock Conn." H 10429 1851 50  0000 L CNN
F 2 "TerminalBlock_Phoenix_PTSM:TerminalBlock_Phoenix_PTSM-0,5-2-HV-2.5-SMD_1x02_P2.50mm_Vertical" H 10350 1950 50  0001 C CNN
F 3 "~" H 10350 1950 50  0001 C CNN
F 4 "https://media.digikey.com/PDF/Data%20Sheets/Phoenix%20Contact%20PDFs/1778832.pdf" H 10350 1950 50  0001 C CNN "Datasheet Link"
F 5 "Phoenix Contact" H 10350 1950 50  0001 C CNN "MFN"
F 6 "1778832" H 10350 1950 50  0001 C CNN "MFP"
F 7 "277-2322-ND" H 10350 1950 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/phoenix-contact/1778832/277-2322-ND/2625556" H 10350 1950 50  0001 C CNN "S1PL"
	1    10350 1950
	-1   0    0    1   
$EndComp
NoConn ~ 10550 1850
NoConn ~ 10550 1950
$Comp
L Connector_Generic:Conn_01x04 CON2
U 1 1 5C4696D8
P 10350 3000
F 0 "CON2" H 10429 2992 50  0000 L CNN
F 1 "Motors Conn." H 10429 2901 50  0000 L CNN
F 2 "TerminalBlock_Phoenix_PTSM:TerminalBlock_Phoenix_PTSM-0,5-4-HV-2.5-SMD_1x06_P2.50mm_Vertical" H 10350 3000 50  0001 C CNN
F 3 "~" H 10350 3000 50  0001 C CNN
F 4 "https://media.digikey.com/PDF/Data%20Sheets/Phoenix%20Contact%20PDFs/1778858.pdf" H 10350 3000 50  0001 C CNN "Datasheet Link"
F 5 "Phoenix Contact" H 10350 3000 50  0001 C CNN "MFN"
F 6 "1778858 " H 10350 3000 50  0001 C CNN "MFP"
F 7 "277-2324-ND" H 10350 3000 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/phoenix-contact/1778858/277-2324-ND/2625558" H 10350 3000 50  0001 C CNN "S1PL"
	1    10350 3000
	-1   0    0    1   
$EndComp
$Comp
L Connector_Generic:Conn_01x03 CON3
U 1 1 5C46C674
P 10350 3750
F 0 "CON3" H 10430 3792 50  0000 L CNN
F 1 "Relay Conn." H 10430 3701 50  0000 L CNN
F 2 "Connectors_Phoenix:PhoenixContact_PTSM0,5_3-HV-2,5_SMD" H 10350 3750 50  0001 C CNN
F 3 "~" H 10350 3750 50  0001 C CNN
F 4 "https://media.digikey.com/PDF/Data%20Sheets/Phoenix%20Contact%20PDFs/1778845.pdf" H 10350 3750 50  0001 C CNN "Datasheet Link"
F 5 "Phoenix Contact" H 10350 3750 50  0001 C CNN "MFN"
F 6 " 1778845" H 10350 3750 50  0001 C CNN "MFP"
F 7 "277-2323-ND" H 10350 3750 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/phoenix-contact/1778845/277-2323-ND/2625557" H 10350 3750 50  0001 C CNN "S1PL"
	1    10350 3750
	-1   0    0    1   
$EndComp
NoConn ~ 10550 3650
NoConn ~ 10550 3750
NoConn ~ 10550 3850
NoConn ~ 10550 3100
NoConn ~ 10550 3000
NoConn ~ 10550 2900
NoConn ~ 10550 2800
$Comp
L Connector:Conn_01x19_Female J6
U 1 1 5C4637FA
P 3450 4600
F 0 "J6" H 3477 4626 50  0000 L CNN
F 1 "Conn_01x19_Female" H 3477 4535 50  0000 L CNN
F 2 "" H 3450 4600 50  0001 C CNN
F 3 "~" H 3450 4600 50  0001 C CNN
F 4 "https://drawings-pdf.s3.amazonaws.com/10492.pdf" H 3450 4600 50  0001 C CNN "Datasheet Link"
F 5 "Sullins Connector Solutions" H 3450 4600 50  0001 C CNN "MFN"
F 6 "PPTC181LFBN-RC" H 3450 4600 50  0001 C CNN "MFP"
F 7 "S7016-ND" H 3450 4600 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/sullins-connector-solutions/PPTC181LFBN-RC/S7016-ND/810156" H 3450 4600 50  0001 C CNN "S1PL"
	1    3450 4600
	1    0    0    -1  
$EndComp
NoConn ~ 3250 5500
NoConn ~ 3250 5400
NoConn ~ 3250 5300
NoConn ~ 3250 5200
NoConn ~ 3250 5100
NoConn ~ 3250 5000
NoConn ~ 3250 4900
NoConn ~ 3250 4800
NoConn ~ 3250 4700
NoConn ~ 3250 4600
NoConn ~ 3250 4500
NoConn ~ 3250 4400
NoConn ~ 3250 4300
NoConn ~ 3250 4200
NoConn ~ 3250 4100
NoConn ~ 3250 4000
NoConn ~ 3250 3900
NoConn ~ 3250 3800
NoConn ~ 3250 3700
$Comp
L Connector:Conn_01x19_Female J7
U 1 1 5C484229
P 5100 4600
F 0 "J7" H 4994 3475 50  0000 C CNN
F 1 "Conn_01x19_Female" H 4994 3566 50  0000 C CNN
F 2 "" H 5100 4600 50  0001 C CNN
F 3 "~" H 5100 4600 50  0001 C CNN
F 4 "https://drawings-pdf.s3.amazonaws.com/10492.pdf" H 5100 4600 50  0001 C CNN "Datasheet Link"
F 5 "Sullins Connector Solutions" H 5100 4600 50  0001 C CNN "MFN"
F 6 "PPTC181LFBN-RC" H 5100 4600 50  0001 C CNN "MFP"
F 7 "S7016-ND" H 5100 4600 50  0001 C CNN "S1PN"
F 8 "https://www.digikey.ca/product-detail/en/sullins-connector-solutions/PPTC181LFBN-RC/S7016-ND/810156" H 5100 4600 50  0001 C CNN "S1PL"
	1    5100 4600
	-1   0    0    1   
$EndComp
NoConn ~ 5300 3700
NoConn ~ 5300 3800
NoConn ~ 5300 3900
NoConn ~ 5300 4000
NoConn ~ 5300 4100
NoConn ~ 5300 4200
NoConn ~ 5300 4300
NoConn ~ 5300 4400
NoConn ~ 5300 4500
NoConn ~ 5300 4600
NoConn ~ 5300 4700
NoConn ~ 5300 4800
NoConn ~ 5300 4900
NoConn ~ 5300 5000
NoConn ~ 5300 5100
NoConn ~ 5300 5200
NoConn ~ 5300 5300
NoConn ~ 5300 5400
NoConn ~ 5300 5500
$EndSCHEMATC
