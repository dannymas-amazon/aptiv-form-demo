import React, {useState, useEffect} from 'react';
import {Form, SpaceBetween, Button, Header, Container, FormField, Input, ColumnLayout, DatePicker} from "@awsui/components-react/"


export default function Form1() {
    const [date, setDate] = React.useState("''");
    const [boxInputs, setBoxInputs] = React.useState([]);

    const addRow = () => {
        const newBoxInputs = [...boxInputs, {boxIndex: boxInputs.length+1, boxId: "ID" + boxInputs.length+1}]
        setBoxInputs(newBoxInputs)
    }

    const changeRow = (index) => {
        // const newBoxInputs = boxInputs.map(i => i.boxIndex ===
        // setBoxInputs(newBoxInputs)
    }

    let boxInputList = boxInputs.map(i =>
        <ColumnLayout columns={2}>
            <FormField label={"Box Id"}>
                <Input onChange={({detail}) => i.boxId = detail.value} value={i.boxId}/>
            </FormField>
            <FormField label={"Defects"}>
                <Input />
            </FormField>
        </ColumnLayout>
    )

    return (
        <Container>
            <form onSubmit={e => e.preventDefault()}>
                <Form
                    actions={
                        <SpaceBetween direction="horizontal" size="xs">
                            <Button onClick={addRow} variant="normal">Add Row</Button>
                            <Button formAction="none" variant="link">
                                Cancel
                            </Button>
                            <Button variant="primary">Submit</Button>
                        </SpaceBetween>
                    }
                    header={
                        <Header variant="h1" description="You can find more examples in FormField documentation page">
                            Form header
                        </Header>
                    }
                >
                    <Container
                        header={
                            <Header variant="h2">
                                Form container header
                            </Header>
                        }
                    >
                        <SpaceBetween direction="vertical" size="l">
                            <ColumnLayout columns={3}>
                                <FormField label="Employee Id">
                                    <Input />
                                </FormField>
                                <FormField label="Station Id">
                                    <Input />
                                </FormField>
                                <FormField label="Date">
                                    <DatePicker
                                    onChange={({ detail }) => setDate(detail.date)}
                                    value={date}
                                    openCalendarAriaLabel={selectedDate =>
                                    "Choose Date" +
                                    (selectedDate
                                        ? `, selected date is ${selectedDate}`
                                        : "")
                                }
                                    nextMonthAriaLabel="Next month"
                                    placeholder="YYYY/MM/DD"
                                    previousMonthAriaLabel="Previous month"
                                    todayAriaLabel="Today"
                                    />
                                </FormField>
                            </ColumnLayout>
                            <ul>
                                {boxInputList}
                            </ul>
                        </SpaceBetween>
                    </Container>
                </Form>
            </form>
        </Container>
    )
};