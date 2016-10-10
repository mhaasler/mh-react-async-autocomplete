
let settings = {
    apiUrl: '/',
    mountpoint: 'searchform',
    placeholder: 'search ...',
    speakingOnText: 'speech recognition on',
    speakingText: 'speak now',
    speakingOffText: 'speech recognition off',
    inputName: 's',
    multiTagSearch: false,
    autoFocus: true,
    speechRecognition: true, // only in google chrome
    speechRecognitionlang: 'en-EN', // speech recognition language
    recognition: null, // speech recognition class - auto set
    reqChar: 2 // required character per search word
}

if(typeof mh_raa_settings === 'object') {
    settings = merge(settings,mh_raa_settings);
 }

if(typeof webkitSpeechRecognition === 'function' && settings.speechRecognition){
    settings.recognition = new webkitSpeechRecognition();
    settings.speechRecognition = 1;
} else {
    settings.speechRecognition = 0;
}

function merge(origin, add) {
    if (!add || (typeof add !== 'object' && add !== null)){
        return origin;
    }

    var keys = Object.keys(add);
    var i = keys.length;
    while(i--){
        origin[keys[i]] = add[keys[i]];
    }
    return origin;
};

module.exports = settings;