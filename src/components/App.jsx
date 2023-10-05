import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';
import { toast, Toaster } from 'react-hot-toast';
import styles from './App.module.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: '',
      name: '',
      number: '',
    };
  }
  componentDidMount() {
    const storeContacts = localStorage.getItem('contacts');
    if (storeContacts) {
      this.setState({ contacts: JSON.parse(storeContacts) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    // console.log(localStorage.getItem('contacts'));
  }

  addContact = newContact => {
    const normalizedNewName = newContact.name.toLowerCase();
    const isDuplicate = this.state.contacts.some(
      contact => contact.name.toLowerCase() === normalizedNewName
    );

    if (isDuplicate) {
      toast.error('This is an error!');
      return;
    }

    this.setState(
      prevState => ({
        contacts: [...prevState.contacts, newContact],
      }),
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    );
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };
    this.setState(
      prevState => ({
        contacts: [...prevState.contacts, newContact],
        name: '',
        number: '',
      }),
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    );
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm
          contacts={this.state.contacts}
          addContact={this.addContact}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          name={this.state.name}
          number={this.state.number}
        />
        <h2 className={styles.contacts}>Contacts</h2>
        <Filter filter={this.state.filter} handleChange={this.handleChange} />
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          deleteContact={this.deleteContact}
        />
        <Toaster position="top-center" />
      </div>
    );
  }
}
