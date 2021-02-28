import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Message from './components/Message';
import personsService from './services/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    personsService.getAll().then(response => {
      setPersons(response);
      setFiltered(response);
    });
  }, []);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState({
    message: '',
    type: '',
  });

  const addPerson = event => {
    event.preventDefault();

    const person = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (person === undefined) {
      const newObject = {
        name: newName,
        number: newNumber,
      };

      personsService
        .create(newObject)
        .then(response => {
          setPersons(persons.concat(response));
          setFiltered(persons.concat(response));
          setMessage({
            message: `Successfully Added ${newName}`,
            type: 'success',
          });
          setTimeout(() => {
            setMessage({
              message: '',
              type: '',
            });
          }, 3000);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          setMessage({
            message: `Validation error`,
            type: 'error',
          });
          setTimeout(() => {
            setMessage({
              message: '',
              type: '',
            });
          }, 3000);
        });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedperson = { ...person, number: newNumber };

        personsService
          .update(changedperson.id, changedperson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== changedperson.id ? person : returnedPerson
              )
            );
            setFiltered(
              persons.map(person =>
                person.id !== changedperson.id ? person : returnedPerson
              )
            );
            setMessage({
              message: `Successfully changed number of ${newName}`,
              type: 'success',
            });
            setTimeout(() => {
              setMessage({
                message: '',
                type: '',
              });
            }, 3000);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            setMessage({
              message: `Information of ${newName} has already been removed from server`,
              type: 'error',
            });
            setTimeout(() => {
              setMessage({
                message: '',
                type: '',
              });
            }, 3000);
          });
      }
    }
  };

  const DeleteItem = obj => {
    if (window.confirm(`Delete ${obj.name} ?`)) {
      personsService
        .remove(obj.id)
        .then(() => {
          setPersons([...filtered].filter(x => obj.id !== x.id));
          setFiltered([...filtered].filter(x => obj.id !== x.id));
          setMessage({
            message: `successfully deleted ${obj.name} from database`,
            type: 'success',
          });
          setTimeout(() => {
            setMessage({
              message: '',
              type: '',
            });
          }, 3000);
        })
        .catch(err => console.log(err));
    }
  };

  const handleChangeName = event => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = event => {
    setNewNumber(event.target.value);
  };

  const filterData = event => {
    const arr = persons.filter(x =>
      x.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFiltered(arr);
  };

  return (
    <div className="container">
      <h1 className="Header">Phonebook</h1>

      <Message message={message.message} type={message.type} />

      <Filter Filter={filterData} />

      <h2 className="subHeader">add a new</h2>

      <PersonForm
        ChangeName={handleChangeName}
        ChangeNumber={handleChangeNumber}
        Add={addPerson}
        Name={newName}
        Number={newNumber}
      />

      <h2 className="subHeader">Numbers</h2>

      <Persons filtered={filtered} Delete={DeleteItem} />
    </div>
  );
};

export default App;
