import React, {Component, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {useStyles} from "./searchStyles";
import {useHistory, withRouter} from 'react-router';
import InputAdornment from "@material-ui/core/InputAdornment";
import {AccountCircle} from "@material-ui/icons";
import { store } from "../../../index";
import { contactsService } from "../../../services/ContactsService"
import {default as contactsActions, fetchContact} from "../../../store/actions/contacts/contacts";
import { ContactsList } from "../../сontactList/contacts";

export const SearchForm = () => {
    return (
        <InputField/>
    );
};

function InputField() {
    let textFieldValue = ""
    let history = useHistory();
    const classes = useStyles();
    function handleClick(ev) {
        if (ev.key === 'Enter') {
            console.log("TEXTFIELDVALUE", textFieldValue)
            store.dispatch(fetchContact(store.getState().contactsReducer.user, textFieldValue))
        }
    }
    function handle(ev) {

    }
    function handleTextFieldChange(ev) {
        textFieldValue = ev.target.value;
    }
    return (
        <TextField id="searchInputField" label="Введите имя" onKeyPress={handleClick}
                   className={classes.inputField}
                   onChange={handleTextFieldChange}
                   InputProps={{
                       startAdornment: (
                           <InputAdornment position="start">
                               <div onClick={handle}>
                                   <AccountCircle />
                               </div>
                           </InputAdornment>),}}
        />
    )
}

export default SearchForm;
