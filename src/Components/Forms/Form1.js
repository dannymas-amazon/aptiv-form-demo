import React, {useState} from 'react';
import {Form, SpaceBetween, Button, Header, BreadcrumbGroup, Container, FormField, Input, ColumnLayout, DatePicker} from "@awsui/components-react/"
import aptivLogo from '../../aptivLogo.png';


export default function Form1() {
    const [date, setDate] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [stationId, setStationId] = useState("");
    const [boxInputs, setBoxInputs] = useState([]);

    const addRow = () => {
        const newBoxInputs = [...boxInputs, {boxIndex: boxInputs.length+1, id: "", defect: ""}]
        setBoxInputs(newBoxInputs)
    }

    const changeRowId = (row, value) => {
        const newBoxInputs = boxInputs.map(i => i.boxIndex === row.boxIndex ? {boxIndex: row.boxIndex, id: value, defect: row.defect} : i)
        setBoxInputs(newBoxInputs)
    }

    const changeRowDefect = (row, value) => {
        const newBoxInputs = boxInputs.map(i => i.boxIndex === row.boxIndex ? {boxIndex: row.boxIndex, id: row.id, defect: value} : i)
        setBoxInputs(newBoxInputs)
    }

    let boxInputList = boxInputs.map(i =>
        <ColumnLayout key={i.boxIndex} columns={2}>
            <FormField label={"Box Id"}>
                <Input onChange={({detail}) =>  changeRowId(i, detail.value)} value={i.id}/>
            </FormField>
            <FormField label={"Defects"}>
                <Input onChange={({detail}) =>  changeRowDefect(i, detail.value)} value={i.defect}/>
            </FormField>
        </ColumnLayout>
    )

    return (
        <Container>
            <BreadcrumbGroup
                items={[
                    { text: "Home", href: "/" },
                    { text: "Defect Form", href: "#" },
                ]}
                ariaLabel="Breadcrumbs"
            />
            <form onSubmit={e => e.preventDefault()}>
                <Form
                    actions={
                        <SpaceBetween direction="horizontal" size="xs">
                            <Button formAction="none" variant="link">
                                Cancel
                            </Button>
                            <Button variant="primary">Submit</Button>
                        </SpaceBetween>
                    }
                    header={
                        <Header variant="h1" description="Fill out the following fields for each box checked">
                            <img alt="company logo" src={aptivLogo}/>
                        </Header>
                    }
                >
                    <Container
                        header={
                            <Header variant="h2">
                                Defect Form
                            </Header>
                        }
                    >
                        <SpaceBetween direction="vertical" size="l">
                            <ColumnLayout columns={3}>
                                <FormField label="Employee Id">
                                    <Input onChange={({detail}) =>  setEmployeeId(detail.value)} value={employeeId}/>
                                </FormField>
                                <FormField label="Station Id">
                                    <Input onChange={({detail}) =>  setStationId(detail.value)} value={stationId}/>
                                </FormField>
                                <FormField label="Date">
                                    <DatePicker
                                    onChange={({ detail }) => setDate(detail.value)}
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
                                {boxInputList}
                            <div style={{width: "100%"}}>
                                <div style={{float: "right"}}>
                                    <Button onClick={addRow} variant="normal">Add Row</Button>
                                </div>
                            </div>
                        </SpaceBetween>
                    </Container>
                </Form>
            </form>
        </Container>
    )
};