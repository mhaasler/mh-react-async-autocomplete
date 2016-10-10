import React from 'react';
import WpSearchInput from '../view/WpSearchInput';
import WpSearchResult from '../view/WpSearchResult';
import WpInputClearBtn from '../view/WpSearchInputClear';
import WpSpeechBtn from '../view/WpSearchBtnSpeech';
import {sendJson} from '../store/WpSearch';
import {multiTagSearch, reqChar, speechRecognition, recognition, placeholder, speakingOnText, speakingText, speakingOffText, speechRecognitionlang} from '../config/settings';

/*
 *  react.js fetch AutoComplete for Wordpress
 */
export default class WpSearchController extends React.Component {

    constructor() {
        super();
        this.state = {
            input: '',
            inputOld: '',
            items: null,
            selected: 0,
            loading: 0,
            speaking: speechRecognition,
            placeholder: placeholder
        };
        this.onChange = this.onChange.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onSpeech = this.onSpeech.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMicroLeave = this.onMicroLeave.bind(this);
        this.onMicroEnter = this.onMicroEnter.bind(this);
    }

    onChange(input){

        // clear input
        input = input.replace(/  /g,' ');
        // validate input
        if((input.length < (reqChar + 1) && input.match(' ')) ||
            input === this.state.inputOld){
            return;
        }
        // change state
        this.setState({
            input: input,
            inputOld: input,
        });
        let inputNew = input.match(/[\S]*$/g);
        // new request or reset list
        if(inputNew[0].length >= reqChar || !multiTagSearch) {
            this.requestApi(input)
        } else {
            this.setState({ items: null });
        }
    }

    requestApi(input){

        this.setState({loading: 1});
        sendJson({s: input}).then(list => {
            // set result list only when input not changed
            if(input === this.state.input) {
                this.setState({
                    items: list,

                });
            }
            // reset state
            this.setState({
                selected: 0,
                loading: 0
            });
        });
    }

    sendForm(){

        if(this.state.input.length > reqChar) {
            document.getElementById('searchform').submit();
        }
    }

    onMouseOver(input){

        this.setInputValue(0,input);
    }

    onMouseLeave(){

        this.setInputValue(0,this.state.inputOld);
    }

    onSelect(){

        this.sendForm();
    }

    onClear(){

        this.setState({
            selected: 0,
            input: '',
            items: null
        })
    }

    onSpeech(event) {

        event.preventDefault();
        let speaking = this.doSpeech();
        let text = this.state.speaking === 2 ? speakingOnText : speakingText;
        this.setState({
            speaking: speaking,
            placeholder: text
        });

    }

    doSpeech()
    {
        if( this.state.speaking === 1) {
            recognition.continuous = true;
            recognition.lang = speechRecognitionlang;
            recognition.interimResults = true;
            recognition.onresult = function (event) {
                var finalTranscript = '';
                var tempTranscript = '';
                for (var i = event.resultIndex; i < event.results.length; ++i) {

                    tempTranscript += event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                this.setState({input: tempTranscript});
                if(finalTranscript.length > 0){
                    this.setState({input: finalTranscript});
                    this.sendForm();
                }
            }
            recognition.onresult = recognition.onresult.bind(this);
            recognition.start();
            return 2;
        }
        if(this.state.speaking === 2){
            recognition.stop();
            return 1;
        }
    }

    setInputValue(selected, input=''){


        if(multiTagSearch && this.state.inputOld.match(' ')){

            let inputNew = this.state.inputOld;
            inputNew = inputNew.replace(/ [\S]*$/,'');
            if(selected>0) {
                input = inputNew + ' ' + input;
            }
        }

        this.setState({
            selected: selected,
            input: input
        });
    }

    handleKeyDown(event){

        var keyCode = event.keyCode;
        const { inputOld, items, selected } = this.state;
        // down
        if(38 === keyCode){
            event.preventDefault();
            let newSelected = Math.max(selected-1, 0);
            let input = newSelected==0 ? inputOld : items[newSelected-1];
            this.setInputValue(newSelected, input);
        }
        // up
        if(40 === keyCode){
            event.preventDefault();
            let newSelected = Math.min(selected+1, items.length);
            this.setInputValue(newSelected, items[newSelected-1]);
        }
        // enter
        if(13 === keyCode){
            event.preventDefault();
            this.sendForm();
        }
        // esc
        if(27 === keyCode){
            this.onClear();
        }
    }

    onMicroEnter(){

        let text = this.state.speaking === 1 ? speakingOnText : speakingOffText;
        this.setState({
            placeholder: text
        });

    }

    onMicroLeave(){

        let text = this.state.speaking === 2 ? speakingText : placeholder;
        this.setState({
            placeholder: text
        });
    }

    render() {

        let { input, items, selected, loading, speaking, placeholder } = this.state;
        let loadingClass = loading > 0 ? ' loading ' : '';
        let speakingClass = speaking > 1 ? ' micro-on' : ' micro-off';
        let speechRecognition = input.length ?  0 : speaking;

        return (
            <div className={'mh-react-async-autocomplete ' + loadingClass + speakingClass}>
                <WpSearchInput onChange={this.onChange} handleKeyDown={this.handleKeyDown} inputValue={input} placeholderValue={placeholder} />
                <WpInputClearBtn inputValue={input} onClear={this.onClear}  loadingClass={loadingClass} />
                <WpSpeechBtn onSpeech={this.onSpeech} speechRecognition={speechRecognition} onMicroEnter={this.onMicroEnter} onMicroLeave={this.onMicroLeave} />
                <WpSearchResult onSelect={this.onSelect}  onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} itemList={items} selected={selected} />
            </div>
        );
    }
}