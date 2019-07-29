import React, { Component } from "react";
import { connect } from "react-redux";

import Person from "../components/Person/Person";
import AddPerson from "../components/AddPerson/AddPerson";
import * as actionsType from "../store/actions";

class Persons extends Component {
  render() {
    return (
      <div>
        <AddPerson personAdded={this.props.onAddPerson} />
        {this.props.persons.map(person => (
          <Person
            key={person.id}
            name={person.name}
            age={person.age}
            clicked={() => this.props.onDeletePerson(person.id)}
          />
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPerson: (name, age) =>
      dispatch({
        type: actionsType.ADD_PERSON,
        personData: { name: name, age: age }
      }),
    onDeletePerson: personId =>
      dispatch({ type: actionsType.DELETE_PERSON, personId: personId })
  };
};

const mapStateToProps = state => {
  return {
    persons: state.persons
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Persons);
