import React from 'react';
import Proptypes from 'prop-types';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, filter, deleteContact }) => {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={styles.contact}>
      {filteredContacts.map(contact => (
        <li className={styles.contact__list} key={contact.id}>
          {contact.name} - {contact.number}
          <button
            className={styles.contact__btn}
            onClick={() => deleteContact(contact.id)}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: Proptypes.array,
  filter: Proptypes.string,
  deleteContact: Proptypes.func,
};
