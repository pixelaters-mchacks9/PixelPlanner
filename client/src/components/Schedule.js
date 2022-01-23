import { Component, useState } from "react";
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  ViewSwitcher,
  Toolbar
} from '@devexpress/dx-react-scheduler-material-ui';

import LoadingBar from './LoadingBar'
import store from 'store'

// import ApiService from '../services/api'


const jsondata = require('../data/sample_data_1.json')
const sampleData = jsondata.SampleData

const initialState = {
  data: sampleData,
  currentDate: '2022-01-22',
  currentViewName: 'mchacks',
  events: [],
  fetching: false
}


export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: initialState.data,
      currentDate: initialState.currentDate,
      currentViewName: initialState.currentViewName,
      events: initialState.events,
      fetching: initialState.fetching,
    };

    this.fetchEvents = this.fetchEvents.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
    this.toggleLoadVisibility = this.toggleLoadVisibility.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.updateStorage = this.updateStorage.bind(this);


    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
  }

  toggleLoadVisibility(show) {
    this.setState({ fetching: show });
  }

  refreshData(data) {
    this.setState({ events: data });
  }

  componentDidMount() {
    this.fetchEvents();
  }

  updateStorage(key, value) {
    store.set(key,value)
  }

  fetchEvents() {
    this.toggleLoadVisibility(true)
    this.state.events.forEach((event, index) => {
      this.updateStorage(index, event);
    })
    
    this.toggleLoadVisibility(false);
  }


  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
        this.refreshData(data);
      }
      if (changed) {
        data = data.map((event) =>
          changed[event.id] ? { ...event, ...changed[event.id] } : event);
          this.refreshData(data);
      }
      if (deleted !== undefined) {
        data = data.filter(event => event.id !== deleted);
        let x = data.filter(event => event.id === deleted);
        store.remove(x[0].id)
      }
      return { data };
    });
  }

  render() {
    const { defaultDate, data, currentViewName } = this.state;

    return (
      <div style={{ marginTop: 50 }}>
        <Paper elevation={3}>
          <Scheduler
            data={data}
            height={800}
          >
            <ViewState
              defaultCurrentDate={defaultDate}
              currentViewName={currentViewName}
              onCurrentViewNameChange={this.currentViewNameChange}
            />
            <EditingState
              onCommitChanges={this.commitChanges}
            />
            <IntegratedEditing />

            <WeekView
              name="mchacks"
              displayName="Full Schedule"
              excludedDays={[1, 2, 3, 4]}
              startDayHour={0}
              endDayHour={23}
            />
            <DayView
              startDayHour={3}
              endDayHour={20}
            />
            {this.state.fetching === false ? null :
              <LoadingBar />
            }
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip
              showOpenButton
              showDeleteButton
            />
            <AppointmentForm />
            <Toolbar />
            <ViewSwitcher />
          </Scheduler>
        </Paper>
      </div>

    );
  }
}