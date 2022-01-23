import { Component } from "react";
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
const jsondata = require('../data/sample_data_1.json')
const sampleData = jsondata.SampleData

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: sampleData,
      currentDate: '2022-01-22',
      currentViewName: 'mchacks',
      events: []
    };

    this.defaultDate = "2022-01-22"
    this.commitChanges = this.commitChanges.bind(this);

    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((event) => 
          changed[event.id] ? { ...event, ...changed[event.id] } : event);
      }
      if (deleted !== undefined) {
        data = data.filter(event => event.id !== deleted);
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
            {this.props.loading === false ? null :
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