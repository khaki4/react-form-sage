import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Input, Button, Message } from 'semantic-ui-react';

class SimpleForm extends Component {
  locationInput({input, meta: { touched, error }, ...custom}) {
    const hasError = touched && error !== undefined;
    return (
      <div>
        {hasError &&
          <Message
            error
            header="Error"
            content={error}
          />
        }
        <Input
          error={hasError}
          fluid
          placeholder="Location.."
          {...input}
          {...custom}
        />
      </div>
    )
  }

  submit() {
    //this
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Field name="location" component={this.locationInput} />
        <br />
        <Button fluid type="submit">Submit</Button>
      </form>
    );
  }
}

const validate = ({ location }) => {
  const errors = {};
  if (!location || location.toString() === '') {
    errors.location = 'Location required';
  }
  return errors;
};

export default reduxForm({
  form: 'simple',
})(SimpleForm);
