import React from "react";
import s from './settings.module.css';
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";

class MyForm extends React.Component {
    state = {
        buttonIsPushed: false,
        date: null,
        dateString: null,
        name: null,
    }
    onButtonClick = () => {
        this.setState({ buttonIsPushed: true });
    }
    onNameChange = (event) => {
        this.setState({name: event.currentTarget.value});
    }
    onPickerChange = (date, dateString) => {
        this.setState({date: date});
        this.setState({dateString: dateString});
        console.log('i m in onPickerChange method');
    }

    render() {
        return <div>
            <div>
                <DatePick onPickerChange={this.onPickerChange} />
            </div>
            <div>
                Имя: <input name={'name'} onChange={this.onNameChange} type={'text'} />
            </div>
            <button onClick={this.onButtonClick}>отправить бронь</button>
            { this.state.buttonIsPushed 
            && <div className={s.resultBlock}>
                {this.state.name} забронировал {this.state.dateString}
            </div>

            }
        </div>
    }
}

class DatePick extends React.Component {

    render() {
        return <div>
        <div >
            <Space direction={"horizontal"}  >
                <DatePicker
                    onFocus={this.ShowCalendar}
                    picker={'date'}
                    onChange={this.props.onPickerChange}
                    onBlur={this.hideCalendar}
                    //dropdownClassName={s.calendar} 
                    //className={s.input}                  
                    //format={moment().format('MMM Do YY')}
                    //locale={moment.locale('ru')}
                    //onOk={setBookingDate}
                    showTime={true}
                    size={'small'}
                    allowClear={false}
                    placement={"bottomRight"}
                    
                     />
            </Space>
        </div>
    </div>
    }
    
}

export default MyForm;

const NextElem = () => {
    return <div>
        следующий месяц
    </div>
}




