import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-hot-toast';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
    };

    this.handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    this.handleSubmit = e => {
      e.preventDefault();
      const newContact = {
        id: nanoid(),
        name: this.state.name,
        number: this.state.number,
      };

      const isDuplicate = this.props.contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      );

      if (isDuplicate) {
        toast.error('¡Ya existe un contacto con ese nombre!');
        return;
      }

      this.props.addContact(newContact);
      this.setState({ name: '', number: '' });
    };
  }
  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <input
          className={styles.form__input}
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Nombre"
        />
        <input
          className={styles.form__input}
          type="tel"
          name="number"
          value={this.state.number}
          onChange={this.handleChange}
          placeholder="Número de teléfono"
        />
        <button className={styles.form__btn} type="submit">
          Agregar Contacto
        </button>
      </form>
    );
  }
}

export default ContactForm;
