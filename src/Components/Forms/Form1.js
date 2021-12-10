import React, {useState} from 'react';
import {
    Form,
    SpaceBetween,
    Button,
    Header,
    BreadcrumbGroup,
    Container,
    FormField,
    Input,
    ColumnLayout,
    DatePicker,
    Select
} from "@awsui/components-react/"
import aptivLogo from '../../aptivLogo.png';
import {getOperatorById} from "../../api/OperatorApi";
import {getFNCRecordByFNCNumber} from "../../api/FNCRecordsApi";
import {getFNCRecords} from "../../graphql/queries";

export default function Form1() {
    const [date, setDate] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [name, setName] = useState("");
    const [team, setTeam] = useState("");
    const [fncNumber, setFncNumber] = useState("");
    const [description, setDescription] = useState("");
    const [article, setArticle] = useState("");
    const [articleId, setArticleId] = useState("");
    const [machineId, setMachineId] = useState("");
    const [boxInputs, setBoxInputs] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const addRow = () => {
        const newBoxInputs = [...boxInputs, {boxIndex: boxInputs.length + 1, id: "", defect: ""}]
        setBoxInputs(newBoxInputs)
    }

    const changeRowId = (row, value) => {
        const newBoxInputs = boxInputs.map(i => i.boxIndex === row.boxIndex ? {
            boxIndex: row.boxIndex,
            id: value,
            defect: row.defect
        } : i)
        setBoxInputs(newBoxInputs)
    }

    const changeRowDefect = (row, value) => {
        const newBoxInputs = boxInputs.map(i => i.boxIndex === row.boxIndex ? {
            boxIndex: row.boxIndex,
            id: row.id,
            defect: value
        } : i)
        setBoxInputs(newBoxInputs)
    }

    let boxInputList = boxInputs.map(i =>
        <ColumnLayout key={i.boxIndex} columns={3}>
            <FormField label={"Box Id"}>
                <Input onChange={({detail}) => changeRowId(i, detail.value)} value={i.id}/>
            </FormField>
            <FormField label={"Metadata"}>
                <Input disabled/>
            </FormField>
            <FormField label={"Defects"}>
                <Input onChange={({detail}) => changeRowDefect(i, detail.value)} value={i.defect}/>
            </FormField>
        </ColumnLayout>
    )

    const employeeLookup = (value) => {
        setEmployeeId(value)
        if(value.length > 3){
            getOperatorById(value).then(res => {
                if(res.data && res.data.getOperator){
                    const now = new Date(Date.now())
                    setName(res.data.getOperator.name)
                    setTeam(res.data.getOperator.team)
                    setDate(now.getFullYear()+'/'+now.getMonth()+'/'+now.getDate())
                }
            }).catch(err => console.log(err))
        }
    }

    const fncLookup = (value) => {
        setFncNumber(value)
        if(value.length >= 3){
            getFNCRecordByFNCNumber(value).then(res => {
                console.log(res)
                if(res.data && res.data.getFNCRecords){
                    setDescription(res.data.getFNCRecords.description)
                    setArticle(res.data.getFNCRecords.article)
                    setArticleId(res.data.getFNCRecords.article_id)
                    setMachineId(res.data.getFNCRecords.machine_id)
                }
            }).catch(err => console.log(err))
        }
    }


    return (
        <Container>
            <BreadcrumbGroup
                items={[
                    {text: "Home", href: "/"},
                    {text: "Defect Form", href: "#"},
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
                            <ColumnLayout columns={4}>
                                <FormField label="Employee Id">
                                    <Input onChange={({detail}) => employeeLookup(detail.value)} value={employeeId}/>
                                </FormField>
                                <FormField label="Name">
                                    <Input disabled value={name}/>
                                </FormField>
                                <FormField label="Team">
                                    <Input disabled value={team}/>
                                </FormField>
                                <FormField label="Date">
                                    <DatePicker
                                        disabled
                                        onChange={({detail}) => setDate(detail.value)}
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
                            <ColumnLayout columns={2}>
                                <FormField label="UAP">
                                    <Select selectedOption={selectedOption} onChange={({ detail }) =>
                                        setSelectedOption(detail.selectedOption)
                                    }
                                            options={[
                                                { label: "Molding", value: "Molding" },
                                                { label: "Assembly", value: "Assembly" },
                                            ]}
                                            selectedAriaLabel="Selected"
                                    />
                                </FormField>
                                <FormField label="FNC Number">
                                    <Input onChange={({detail}) => fncLookup(detail.value)} value={fncNumber}/>
                                </FormField>
                            </ColumnLayout>
                            <ColumnLayout columns={1}>
                                <FormField label="Description">
                                    <Input disabled value={description}/>
                                </FormField>
                            </ColumnLayout>
                            <ColumnLayout columns={3}>
                                <FormField label="Article">
                                    <Input disabled value={article}/>
                                </FormField>
                                <FormField label="Article ID">
                                    <Input disabled value={articleId}/>
                                </FormField>
                                <FormField label="Machine ID">
                                    <Input disabled value={machineId}/>
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