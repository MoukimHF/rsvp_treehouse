import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';
import Counter from './Counter'; 
class App extends Component {
  state = {
    isFiltered:false,
    pendingGuest:"",
    guests: [
      {
        name:'moukim',
        isConfirmed:false,
        isEditing:false,
      },
      {
        name:'ashley',
        isConfirmed:false,
        isEditing:false,
      },
      
      {
        name:'zebi',
        isConfirmed:false,
        isEditing:false,
      },
    ]
  }
toggleGuestPropertyAt = (property,indexToChange) =>
  this.setState({
    guests:this.state.guests.map((guest,index)=>{
     if(index===indexToChange){
      return{
        ...guest ,
        [property]: !guest[property]
      };
    }
    return guest;
    })
  });

  toggleConfirmationAt = index =>{
    this.toggleGuestPropertyAt("isConfirmed",index);
  }

  toggleEditingAT = index =>{
    this.toggleGuestPropertyAt("isEditing",index); 
  }


    setNameAt = (name,indexToChange) =>
  this.setState({
    guests:this.state.guests.map((guest,index)=>{
     if(index===indexToChange){
      return{
        ...guest ,
        name
      };
    }
    return guest;
    })
  });


  toggleFilter = ()=>{
    this.setState({isFiltered:!this.state.isFiltered})
  }

  handleNameInput = e =>{
    this.setState({
      pendingGuest: e.target.value
    })
  }
  handleSubmit=e =>{
    e.preventDefault()
    this.setState({
    guests:[
      {
        name:this.state.pendingGuest,
        isConfirmed:false,
        isEditing:false
      },...this.state.guests
    ],
    pendingGuest:""

    })
   
  }
  RemoveGuestAt = index =>{
    this.setState({
      guests:[
        ...this.state.guests.slice(0,index),
        ...this.state.guests.slice(index + 1)
      ]
    });

  }
  getTotalInvited = ()=>{
    return this.state.guests.length;
  };
  getTotalConfirmed = ()=>
    this.state.guests.reduce((total, guest)=> guest.isConfirmed ? total +1 : total,0);
  
  render() {
    const totalInvited=this.getTotalInvited();
    const numberAttending=this.getTotalConfirmed();
    const numberUnConfirmed = totalInvited - numberAttending;
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>A Treehouse App</p>
          <form
           onSubmit={this.handleSubmit}>
            <input
             type="text" 
             onChange={this.handleNameInput}
             value={this.state.pendingGuest}
             placeholder="Invite Someone" 
              
             />
            <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input type="checkbox" 
                onChange={this.toggleFilter}
                checked={this.state.isFiltered}
              /> Hide those who haven't responded
            </label>
          </div>
          <Counter 
            totalInvited={totalInvited}
            numberAttending={numberAttending}
            numberUnConfirmed={numberUnConfirmed}
          />
          <GuestList guests={this.state.guests} 
                     toggleConfirmationAt={this.toggleConfirmationAt}
                     toggleEditingAt={this.toggleEditingAT} 
                     setNameAt={this.setNameAt}  
                     isFiltered={this.state.isFiltered}
                     RemoveGuestAt={this.RemoveGuestAt}
                     pendingGuest={this.state.pendingGuest}
                     />
          
        </div>
      </div>
    );
  }
}

export default App;
