import * as React from 'react';
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
  Toolbar, 
  DateNavigator,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';

const jsondata = require('../data/sample_data_1.json')
const sampleData = jsondata.SampleData
import Header from './Header';

const messages = {
  moreInformationLabel: '',
};

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor') {
    return null;
  } return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };


  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label
        text="Location"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Location"
      />

      {/* <AppointmentForm.Label
        text="Owner"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Owner"
      /> */}
    </AppointmentForm.BasicLayout>
  );
};

export default class Schedule extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: sampleData,
      currentDate: '2022-01-22',
      currentViewName: 'day'
    };

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
        data = data.map((appointment) => (
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { currentDate, data, currentViewName } = this.state;

    return (
      <>
      <Header></Header>
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            defaultCurrentDate={"2022-01-21"}
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
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            textEditorComponent={TextEditor}
            messages={messages}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
        </Scheduler>
      </Paper>
      </>
    );
  }
}
