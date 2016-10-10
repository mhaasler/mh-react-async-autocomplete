import React from 'react/react';
import { placeholder, inputName, autoFocus } from '../config/settings';

export default function WpSearchInput({ inputValue, onChange , handleKeyDown, placeholderValue }) {

    let autoFocusS = autoFocus ? 'autoFocus' : '';
    placeholderValue = placeholderValue || placeholder;

    return (
            <input className={'search--input'}
                   autoFocus={autoFocusS}
                   autoComplete="off"
                   name={inputName}
                   id={inputName}
                   type="text"
                   value={inputValue}
                   onChange={(event)=>{onChange(event.target.value)}}
                   onKeyDown={(event)=>{handleKeyDown(event)}}
                   placeholder={placeholderValue}/>
    );
}

WpSearchInput.propTypes = {
    inputValue: React.PropTypes.string,
    placeholderValue: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    handleKeyDown: React.PropTypes.func.isRequired,
};
