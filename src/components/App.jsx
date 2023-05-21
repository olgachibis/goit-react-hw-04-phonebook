import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css'; 

  export const App = () => {
 const [contacts, setContacts] = useState(() => 
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  
  const [filter, setFilter] = useState('');

 useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  
  const handleInputChange = e => {
    setFilter(e.currentTarget.value);
  };

  
  const addContact = ({ name, number }) => {
    
    if (contacts.some(value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()))
    { alert(`${name} is already in contacts`);
    }
    else {
      
      setContacts(prev => {
        const list = [...prev]; 
          list.push({
          id: nanoid(), 
          name: name,
          number: number,
        });

        return list;
      });
    }
  };

    const filterF = () => {
    const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredContacts;
  };

  const onDeleteContact = id => {
    const filtred = contacts.filter(item => item.id !== id);
    setContacts(filtred);
  }

    return (
      <div className={css.conteiner}>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} handleInputChange={handleInputChange} />
        <ContactList onDeleteContact={onDeleteContact} contacts={filterF()} />
      </div>
    );
  }

