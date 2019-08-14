import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css'

class MeetingForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {name: '', startTime: new Date(), endTime: new Date()};
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlestartTimeChange = this.handlestartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handlestartTimeChange(date) {
        this.setState({startTime: date});
    }

    handleEndTimeChange(date){
        this.setState({endTime: date});
    }

    handleSubmit(event) {
        console.log(`name: ${this.state.name}`); //TODO: add a name field to the back end
        console.log(`startTime: ${this.state.startTime}`);
        console.log(`endTime: ${this.state.endTime}`);

        let reqBody = {
            startTime: this.state.startTime,
            endTime: this.state.endTime
        }

        fetch('http://localhost:8080/meetings', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(reqBody)
        }).then(async function(response){
            //Redirect user to said meeting page.
        })

        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    name:
                    <input type="text" onChange={this.handleNameChange} />
                </label>
                <label>
                    start date:
                    <DatePicker 
                        selected={this.state.startTime} 
                        onChange={this.handlestartTimeChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </label>
                <label>
                    end date:
                    <DatePicker 
                        selected={this.state.endTime} 
                        onChange={this.handleEndTimeChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default MeetingForm;