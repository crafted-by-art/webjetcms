function openDialogDate(date, func)
{
   openDialog("/admin/calendar_popup.jsp?date="+date, 140, 140, func)
}

function openDialogTimeStart(date, func)
{      
      openDialog("/admin/time_popup.jsp?time="+date, 100, 180, func);
}


function checkDate(vstup)
{   
   if (vstup.value.length == 0) return;
   
   test_date = vstup.value;      
   test_date = test_date.replace(",", ".");
   test_date = test_date.replace(" ", ".");
   test_date = test_date.replace(":", ".");
   test_date = test_date.replace("-", ".");
   vstup.value = test_date;
   
   test_date = vstup.value;
   test_date = test_date.replace(",", ".");
   test_date = test_date.replace(" ", ".");
   test_date = test_date.replace(":", ".");
   test_date = test_date.replace("-", ".");
   vstup.value = test_date;
   
   var text
   var index
   var tecka
   var den
   var mesic
   var rok
   var ch
   text=""
   
   den=""
   mesic=""
   rok=""
   tecka=0
   
   for (index = 0; index < vstup.value.length; index++) 
   {
      ch = vstup.value.charAt(index);
      if (ch != "0" && ch != "1" && ch != "2" && ch != "3" && ch != "4" && ch != "5" && ch != "6" && ch != "7" && ch != "8" && ch != "9" && ch != ".") 
         {text="D�tum mus� by� vo form�te DD.MM.RRRR (DD=de�, MM=mesiac, RRRR=rok).\r"}
      if ((ch == "0" || ch == "1" || ch == "2" || ch == "3" || ch == "4" || ch == "5" || ch == "6" || ch == "7" || ch == "8" || ch == "9") && (text ==""))
      {
         if (tecka == 0)
            {den=den + ch}
         if (tecka == 1)
            {mesic=mesic + ch}
         if (tecka == 2)
            {rok=rok + ch}
      }
      if (ch == "." && text == "")
      {
         tecka++;
      }  
   }
      
   if ((den<1 || den >31) && (text == ""))
      {text=text + "Po�et dn� v mesiaci nesmie by� menej ako 1 alebo viac ako 31.\r"}
   if ((mesic<1 || mesic>12) && (text == ""))
      {text=text + "Mesiac nem��e by� men�� ako 1 alebo v��� ako 12.\r"}
   if (rok<1998 && tecka == 2 && text == "" && rok != "")
      {text=text + "Rok nem��e by� men�� ako 1998.\r"}
   if ((tecka == 2 && rok == "") || (tecka > 2) || rok=="")
      {text=text+ "D�tum mus� by� vo form�te DD.MM.RRRR (DD=de�, MM=mesiac, RRRR=rok).\r"}
   if (mesic == 2)
   {
      if (rok != "")
         {
         if (rok % 4 == 0)
            {
            if (den>29)
               {text=text + "Vo febru�ri roku " + rok + " je iba 29 dn�.\r"}
            }
         else
            {
            if (den>28)
               {text=text + "Vo febru�ri roku " + rok + " je iba 28 dn�.\r"}
            }
         }
      else
         {
         if (den>29)
            {text=text + "Vo febru�ri je 29 dn�.\r"}
         }
   }

   if ((mesic == 4 || mesic == 6 || mesic == 9 || mesic == 11) && (den>30))
      {text=text + "Po�et dn� vo vybranom mesiaci nesmie by� menej ako 1 alebo viac ako 30.\r"}
   
   if (text!="")
   {
      alert(text);
      vstup.select();
      vstup.focus();
      return(vstup);
   }
   else
   {
      return(null);
   }
}

//////////////////////////////////////////////////////////////////////
// Numerical Checking Support (internal use)

function IsNumber(Value, AllowPoint, DigitsAfter, DigitsBefore)
// Returns true if the given Value is a number that parseInt/Float will read correctly
// Returns false is the given Value contains junk which parseInt/Float would ignore
// Additionally, can limit number of digits before and after point
{
   // If AllowPoint is not set, assume it is false ie check for an integer
   if (IsNumber.arguments.length < 2)
      AllowPoint = false;

   if (!(AllowPoint))
   {  DigitsBefore = -1;
      DigitsAfter = -1;
   }

   // Flags for float/integer validation
   DigitsStarted = false;
   DigitsStopped = false;
   PointPosition = -1;
   SignPosition = -1;
   CountBefore = 0;
   CountAfter = 0;
   ValidNumber = false;

   // Check its a valid number
   for (I = 0; I < Value.length; I++)
   {  // "-" is allowable once, immediately before digits and/or point only
      if (Value.charAt(I) == "-")
      {  if ((DigitsStarted) || (SignPosition > -1) || PointPosition > -1)
         {  ValidNumber = false;
            break;
         }
         else
            SignPosition = I;
      }

      // "." is allowed once and must be immediately before or after a digit
      else if (Value.charAt(I) == ".")
      {  if ((PointPosition > -1) || (DigitsStopped) || (!(AllowPoint)))
         {  ValidNumber = false;
            break;
         }
         else
            PointPosition = I;
      }

      // " " is allowable when leading or trailing only
      else if (Value.charAt(I) == " ")
         DigitsStopped = DigitsStarted;

      // numbers are allowable when in one lump
      // any sign or point must be immediately previous if this is the first digit
      else if ((Value.charAt(I) >= "0") &&
               (Value.charAt(I) <= "9"))
      {  ValidNumber = true;
         if ( (((SignPosition > -1) && (SignPosition != I-1) && (SignPosition != PointPosition-1)) && (!(DigitsStarted)))
              ||
              (((PointPosition > -1) && (PointPosition != I-1)) && (!(DigitsStarted)))
              ||
              (DigitsStopped)
            )
         {  ValidNumber = false; alert(I + " " + SignPosition + " " + PointPosition + " " + DigitsStarted);
            break;
         }

         DigitsStarted = true;
         if (PointPosition > -1)
            CountAfter++;
         else
            CountBefore++;

         if (((DigitsBefore > -1) && (CountBefore > DigitsBefore)) ||
             ((DigitsAfter > -1) && (CountAfter > DigitsAfter)))
         {  ValidNumber = false;
            break;
         }
      }

      // nothing else is allowed
      else
      {  ValidNumber = false;
         break;
      }
   }

   return ValidNumber;
}


function CheckTime(Field)
// Checks the contents of a given TEXT/TEXTAREA is a valid time hh:mm
{      
   // Allow blank times
   if (Field.value.length == 0) { return null; }
      
   
   test_time = Field.value;
   test_time = test_time.replace(",", ":");
   test_time = test_time.replace(" ", ":");
   test_time = test_time.replace("\.", ":");
   test_time = test_time.replace("-", ":");   
   
   dvojbodka = test_time.indexOf(":");
   
   // Check it
   if ( (test_time.length > 5)                   // its too long
        ||
        (dvojbodka < 1)              // its not got a : in the middle
        ||
        (!(IsNumber(test_time.substring(0,dvojbodka))))   // its hours isnt a number
        ||
        (!(IsNumber(test_time.substring(dvojbodka+1,test_time.length))))   // its minutes isnt a number
        ||
        (test_time.indexOf(" ") > -1)             // its got spaces in it
        ||
        (test_time.indexOf("-") > -1)             // its got negatives in it
        ||
        (parseInt(test_time.substring(0,2)) > 23) // its got too many hours
        ||
        (parseInt(test_time.substring(3,5)) > 59) // its got too many minutes
      )
   {        
      window.alert("Zadan� �as nie je korektn�");
      Field.select();
      Field.focus();
      return Field;
   }
   else
   {
      Field.value = test_time;
      return null;      
   }
}

function checkEndTime(fieldStart, fieldEnd, b_isEnd)
{
   if (CheckTime(fieldStart)!=null)
   {
      return;
   }
   if (CheckTime(fieldEnd)!=null)
   {
      return;
   }

   startTime = fieldStart.value;
   endTime = fieldEnd.value;

   if (endTime.length < 3 || endTime.indexOf(":") < 1)
   {
      fieldEnd.value = "";
      return;
   }
   if (startTime.length < 3 || startTime.indexOf(":") < 1)
   {
      startTime = "08:30"
      fieldStart.value = startTime;
   }

   minutesStart = (startTime.substring(0,startTime.indexOf(':'))-0) * 60 +
                  (startTime.substring(startTime.indexOf(':')+1,startTime.length)-0);
   minutesEnd = (endTime.substring(0,endTime.indexOf(':'))-0) * 60 +
                (endTime.substring(endTime.indexOf(':')+1,endTime.length)-0);

   if (b_isEnd == false && lastTimeDif > 0)
   {
      minutesEnd = minutesStart + lastTimeDif;
      hours = Math.floor(minutesEnd / 60);
      if (hours < 10) hours = "0"+hours;
      minutes = (minutesEnd - (hours * 60));
      if (minutes < 10) minutes = "0"+minutes;
      fieldEnd.value = hours + ':' + minutes;
      endTime = fieldEnd.value;
   }
   else
   {
      if (minutesEnd < minutesStart)
      {
         fieldEnd.value = "";
         window.alert("Koncov� cas nem��e byt skor ako zaciatocn�.");
         return;
      }
   }
   lastTimeDif = minutesEnd - minutesStart;
   //window.alert("min start="+minutesStart+" end="+minutesEnd);

}

////////////////////////////////////////lubbis
///////////////////////////////////////////////
function checkDate(vstup)
{   
  if (vstup && vstup.value && vstup.value.length > 0)
  {
   test_date = vstup.value;   
   test_date = test_date.replace(",", ".");
   test_date = test_date.replace(" ", ".");
   test_date = test_date.replace(":", ".");
   test_date = test_date.replace("-", ".");
   vstup.value = test_date;

   test_date = vstup.value;
   test_date = test_date.replace(",", ".");
   test_date = test_date.replace(" ", ".");
   test_date = test_date.replace(":", ".");
   test_date = test_date.replace("-", ".");
   vstup.value = test_date;

   var text
   var index
   var tecka
   var den
   var mesic
   var rok
   var ch
   text=""

   den=""
   mesic=""
   rok=""
   tecka=0

   for (index = 0; index < vstup.value.length; index++)
   {
      ch = vstup.value.charAt(index);
      if (ch != "0" && ch != "1" && ch != "2" && ch != "3" && ch != "4" && ch != "5" && ch != "6" && ch != "7" && ch != "8" && ch != "9" && ch != ".")
         {text="D�tum mus� by� vo form�te DD.MM alebo DD.MM.RRRR (DD=de�, MM=mesiac, RRRR=rok).\r"}
      if ((ch == "0" || ch == "1" || ch == "2" || ch == "3" || ch == "4" || ch == "5" || ch == "6" || ch == "7" || ch == "8" || ch == "9") && (text ==""))
      {
         if (tecka == 0)
            {den=den + ch}
         if (tecka == 1)
            {mesic=mesic + ch}
         if (tecka == 2)
            {rok=rok + ch}
      }
      if (ch == "." && text == "")
      {
         if (tecka == 1)
            {tecka=2}
         if (tecka == 0)
            {tecka=1}

      }
   }

   if ((den<1 || den >31) && (text == ""))
      {text=text + "Po�et dn� v mesiaci nesmie by� menej ako 1 alebo viac ako 31.\r"}
   if ((mesic<1 || mesic>12) && (text == ""))
      {text=text + "Mesiac nem��e by� men�� ako 1 alebo v��� ako 12.\r"}
   if (rok<1900 && tecka == 2 && text == "" && rok != "")
      {text=text + "Rok nem��e by� men�� ako 1900.\r"}
   if ((tecka == 2 && rok == "") || (tecka > 2))
      {text=text+ "D�tum mus� by� vo form�te DD.MM alebo DD.MM.RRRR (DD=de�, MM=mesiac, RRRR=rok).\r"}
   if (mesic == 2)
   {
      if (rok != "")
         {
         if (rok % 4 == 0)
            {
            if (den>29)
               {text=text + "Vo febru�ri roku " + rok + " je iba 29 dn�.\r"}
            }
         else
            {
            if (den>28)
               {text=text + "Vo febru�ri roku " + rok + " je iba 28 dn�.\r"}
            }
         }
      else
         {
         if (den>29)
            {text=text + "Vo febru�ri je 29 dn�.\r"}
         }
   }

   if ((mesic == 4 || mesic == 6 || mesic == 9 || mesic == 11) && (den>30))
      {text=text + "Po�et dn� vo vybranom mesiaci nesmie by� menej ako 1 alebo viac ako 30.\r"}

   if (text!="")
   {
      alert(text);
      vstup.select();
      vstup.focus();
      return(vstup);
   }
   else
   {
      return(null);
   }
 }
 return(null)
}

//////////////////////////////////////////////////////////////////////

function checkTime(Field)
// Checks the contents of a given TEXT/TEXTAREA is a valid time hh:mm
{
   // Allow blank times
   if (!Field || !Field.value || Field.value.length == 0) { return null; }

   test_time = Field.value;   
   test_time = test_time.replace(",", ":");
   test_time = test_time.replace(" ", ":");
   test_time = test_time.replace("\.", ":");
   test_time = test_time.replace("-", ":");

   dvojbodka = test_time.indexOf(":");

   // Check it
   if ( (test_time.length > 5)                   // its too long
        ||
        (dvojbodka < 1)              // its not got a : in the middle
        ||
        (!(IsNumber(test_time.substring(0,dvojbodka))))   // its hours isnt a number
        ||
        (!(IsNumber(test_time.substring(dvojbodka+1,test_time.length))))   // its minutes isnt a number
        ||
        (test_time.indexOf(" ") > -1)             // its got spaces in it
        ||
        (test_time.indexOf("-") > -1)             // its got negatives in it
        ||
        (parseInt(test_time.substring(0,2)) > 23) // its got too many hours
        ||
        (parseInt(test_time.substring(3,5)) > 59) // its got too many minutes
      )
   {
      window.alert("Zadan� �as nie je korektn�");
      Field.select();
      Field.focus();
      return Field;
   }
   else
   {
      Field.value = test_time;
      return null;
   }
}

function checkEndTime(fieldStart, fieldEnd, b_isEnd)
{
   if (checkTime(fieldStart)!=null)
   {
      return;
   }
   if (checkTime(fieldEnd)!=null)
   {
      return;
   }

   startTime = fieldStart.value;
   endTime = fieldEnd.value;

   if (endTime.length < 3 || endTime.indexOf(":") < 1)
   {
      fieldEnd.value = "";
      return;
   }
   if (startTime.length < 3 || startTime.indexOf(":") < 1)
   {
      startTime = "08:30"
      fieldStart.value = startTime;
   }

   minutesStart = (startTime.substring(0,startTime.indexOf(':'))-0) * 60 +
                  (startTime.substring(startTime.indexOf(':')+1,startTime.length)-0);
   minutesEnd = (endTime.substring(0,endTime.indexOf(':'))-0) * 60 +
                (endTime.substring(endTime.indexOf(':')+1,endTime.length)-0);

   if (b_isEnd == false && lastTimeDif > 0)
   {
      minutesEnd = minutesStart + lastTimeDif;
      hours = Math.floor(minutesEnd / 60);
      if (hours < 10) hours = "0"+hours;
      minutes = (minutesEnd - (hours * 60));
      if (minutes < 10) minutes = "0"+minutes;
      fieldEnd.value = hours + ':' + minutes;
      endTime = fieldEnd.value;
   }
   else
   {
      if (minutesEnd < minutesStart)
      {
         fieldEnd.value = "";
         window.alert("Koncov� cas nem��e byt sk�r ako za�iato�n�.");
         return;
      }
   }
   lastTimeDif = minutesEnd - minutesStart;
   //window.alert("min start="+minutesStart+" end="+minutesEnd);

}


