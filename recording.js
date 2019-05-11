var zip = new JSZip(); //Object intended to compress the audio files into one zip file
var seconds; 

function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
}
var mediaConstraints = {
    audio: true
};

let mics = document.querySelectorAll('.mic');
/*
for(mic of mics)
{
    mic.onclick = function() 
    {
        this.disabled = true;
        
        captureUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
    };

    
}
*/

/*
document.querySelector('#save-recording').onclick = function() {
    this.disabled = true;
    mediaRecorder.save();
    // alert('Drop WebM file on Chrome or Firefox. Both can play entire file. VLC player or other players may not work.');
};
*/

/*

function startsWith(wordToCompare) {
    return function(element) {
        return element.indexOf(wordToCompare) === 0;
    }
}

*/

var mediaRecorder;

function onMediaSuccess(name,timeAnswer,classe,stream) 
{

    seconds = timeAnswer;

    let clocks = document.getElementsByClassName("clock");
    for(clock of clocks)
    {
        clock.innerHTML = seconds > 9 ? `0:${seconds}` : `0:0${seconds}`;
    }

    var myTimer = setInterval(updateClock, 1000);

    let _mics = document.querySelectorAll('.mic');



    
    for(mic of _mics)
    {
        let nameId;
        let transmissionClass;
  

        let _transitions = document.querySelectorAll(classe);
        
        for(transition of _transitions)
        {
            transition.classList.remove('scale-out');
            transition.classList.add('scale-in');
        }
     
    }
    

    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.stream = stream;
    
    mediaRecorder.recorderType = StereoAudioRecorder;
    mediaRecorder.mimeType = 'audio/wav';
    
    // don't force any mimeType; use above "recorderType" instead.
    // mediaRecorder.mimeType = 'audio/webm'; // audio/ogg or audio/wav or audio/webm
    mediaRecorder.audioChannels = 2; //Forcing stereo


    //Event for when data is available, the recording has stopped
    mediaRecorder.start(seconds*1000);

    
    mediaRecorder.ondataavailable = function(blob) {
    
        clearInterval(myTimer);

        let _mics = document.querySelectorAll('.mic');

        for(mic of _mics)
        {
            
            let _transitions = document.querySelectorAll(classe);
            
            for(transition of _transitions)
            {
                transition.classList.remove('scale-in');
                transition.classList.add('scale-out');
            }
         
        }
        
        

        Materialize.toast('Fim da gravação!', 2000) // 2000 is the duration of the toast

       // window.alert("Fim da gravação"); //Alerts that a new file is ready
        mediaRecorder.stop(); //Stop the recording
        mediaRecorder.stream.stop(); //Stop the stream of data



        zip.file(`${name}.wav`,blob); //Zips the file 

    };
    
}

function updateClock()
{
    seconds--;
    let clocks = document.getElementsByClassName("clock");
    for(clock of clocks)
    {
        clock.innerHTML = seconds > 9 ? `0:${seconds}` : `0:0${seconds}`;
    }
}

function onMediaError(e) {
    console.error('media error', e);
}


// below function via: http://goo.gl/B3ae8c
function bytesToSize(bytes) {
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
// below function via: http://goo.gl/6QNDcI
function getTimeLength(milliseconds) {
    var data = new Date(milliseconds);
    return data.getUTCHours() + " hours, " + data.getUTCMinutes() + " minutes and " + data.getUTCSeconds() + " second(s)";
}
window.onbeforeunload = function() {
    document.querySelector('#start-recording').disabled = false;
};

function saveZip()
{
    let studentName = document.getElementById("studentName").value;
    let schoolYear = document.getElementById("schoolYear").value;
    
    if(!studentName) 
    {
        var $toastContent = $('<span>Insira um nome !</span>')
        Materialize.toast($toastContent, 2000) //
    }
    else{

    zip.generateAsync({type:"blob"}).then(function(content) {
        // see FileSaver.js
        saveAs(content, `${studentName}${schoolYear}.zip`);
    });
}
}
