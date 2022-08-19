import React from "react";
import s from './ProfileInfo.module.css';


class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status,
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    }
    deActivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatusThunkCreator(this.state.status);
    }
    onStatusChange = (event) => {
        this.setState({
            status: event.currentTarget.value, // ивента текущего положения значение, event - объект события.
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return <div>
            {!this.state.editMode ?
                <span className={s.span} onClick={ this.activateEditMode } >{this.props.status || '*****'}</span> 
                : <div>
                    <input  onChange={this.onStatusChange} 
                            autoFocus={true} 
                            className={s.statusInput} 
                            onBlur={this.deActivateEditMode} 
                            value={this.state.status} />
                    <button onClick={this.onStatusChange}>обновить статус</button>
                </div>
            }
        </div>
    } 
}

export default ProfileStatus;