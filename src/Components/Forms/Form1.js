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
    Select,
    Grid
} from "@awsui/components-react/"
import aptivLogo from '../../aptivLogo.png';
import {getOperatorById} from "../../api/OperatorApi";
import {getFNCRecordByFNCNumber} from "../../api/FNCRecordsApi";

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

    //Totals
    const [totalBoxQuantity, setTotalBoxQuantity] = useState(0);
    const [totalDefects, setTotalDefects] = useState(0);
    const [totalManque, setTotalManque] = useState(0);
    const [totalBavure, setTotalBavure] = useState(0);
    const [totalExces, setTotalExces] = useState(0);
    const [totalAutres, setTotalAutres] = useState(0);

    const addRow = () => {
        const newBoxInputs = [...boxInputs, {boxIndex: boxInputs.length + 1, id: "", defect: ""}]
        setBoxInputs(newBoxInputs)
    }

    const changeRow = (row, value, field) => {
        let newBoxInputs
        let defects
        switch(field){
            case 'id':
                newBoxInputs = boxInputs.map(i => i.boxIndex === row.boxIndex ? {...i, id: value} : i)
                break;
            case 'boxDate':
                newBoxInputs = boxInputs.map(i => i.boxIndex === row.boxIndex ? {...i, boxDate: value} : i)
                break;
            case 'boxQuantity':
                newBoxInputs = boxInputs.map(i => i.boxIndex === row.boxIndex ? {...i, boxQuantity: value} : i)
                const boxQuantity = newBoxInputs.map(i => {
                    if(i.boxQuantity && !isNaN(i.boxQuantity.trim()))
                        return parseInt(i.boxQuantity.trim(), 10)
                    return 0
                }).reduce(add, 0)
                setTotalBoxQuantity(boxQuantity)
                break;
            case 'manqueMatiere':
                newBoxInputs = boxInputs.map(i => {
                    if(i.boxIndex === row.boxIndex) {
                        let sum = 0
                        if(value && !isNaN(value.trim())) sum += parseInt(value.trim(), 10)
                        if(i.bavure && !isNaN(i.bavure.trim())) sum += parseInt(i.bavure.trim(), 10)
                        if(i.exces && !isNaN(i.exces.trim())) sum += parseInt(i.exces.trim(), 10)
                        if(i.autres && !isNaN(i.autres.trim())) sum += parseInt(i.autres.trim(), 10)
                        return {...i, manqueMatiere: value, defectNumber: sum}
                    } else {
                        return i
                    }
                })
                const manqueMatiere = newBoxInputs.map(i => {
                    if(i.manqueMatiere && !isNaN(i.manqueMatiere.trim()))
                        return parseInt(i.manqueMatiere.trim(), 10)
                    return 0
                }).reduce(add, 0)
                defects = newBoxInputs.map(i => {
                    if(i.defectNumber)
                        return i.defectNumber
                    return 0
                }).reduce(add, 0)
                setTotalDefects(defects)
                setTotalManque(manqueMatiere)
                break;
            case 'bavure':
                newBoxInputs = boxInputs.map(i => {
                    if(i.boxIndex === row.boxIndex) {
                        let sum = 0
                        if(i.manqueMatiere && !isNaN(i.manqueMatiere.trim())) sum += parseInt(i.manqueMatiere.trim(), 10)
                        if(value && !isNaN(value.trim())) sum += parseInt(value.trim(), 10)
                        if(i.exces && !isNaN(i.exces.trim())) sum += parseInt(i.exces.trim(), 10)
                        if(i.autres && !isNaN(i.autres.trim())) sum += parseInt(i.autres.trim(), 10)
                        return {...i, bavure: value, defectNumber: sum}
                    } else {
                        return i
                    }
                })
                const bavure = newBoxInputs.map(i => {
                    if(i.bavure && !isNaN(i.bavure.trim()))
                        return parseInt(i.bavure.trim(), 10)
                    return 0
                }).reduce(add, 0)
                defects = newBoxInputs.map(i => {
                    if(i.defectNumber)
                        return i.defectNumber
                    return 0
                }).reduce(add, 0)
                setTotalDefects(defects)
                setTotalBavure(bavure)
                break;
            case 'exces':
                newBoxInputs = boxInputs.map(i => {
                    if(i.boxIndex === row.boxIndex) {
                        let sum = 0
                        if(i.manqueMatiere && !isNaN(i.manqueMatiere.trim())) sum += parseInt(i.manqueMatiere.trim(), 10)
                        if(i.bavure && !isNaN(i.bavure.trim())) sum += parseInt(i.bavure.trim(), 10)
                        if(value && !isNaN(value.trim())) sum += parseInt(value.trim(), 10)
                        if(i.autres && !isNaN(i.autres.trim())) sum += parseInt(i.autres.trim(), 10)
                        return {...i, exces: value, defectNumber: sum}
                    } else {
                        return i
                    }
                })
                const exces = newBoxInputs.map(i => {
                    if(i.exces && !isNaN(i.exces.trim()))
                        return parseInt(i.exces.trim(), 10)
                    return 0
                }).reduce(add, 0)
                defects = newBoxInputs.map(i => {
                    if(i.defectNumber)
                        return i.defectNumber
                    return 0
                }).reduce(add, 0)
                setTotalDefects(defects)
                setTotalExces(exces)
                break;
            case 'autres':
                newBoxInputs = boxInputs.map(i => {
                    if(i.boxIndex === row.boxIndex) {
                        let sum = 0
                        if(i.manqueMatiere && !isNaN(i.manqueMatiere.trim())) sum += parseInt(i.manqueMatiere.trim(), 10)
                        if(i.bavure && !isNaN(i.bavure.trim())) sum += parseInt(i.bavure.trim(), 10)
                        if(i.exces && !isNaN(i.exces.trim())) sum += parseInt(i.exces.trim(), 10)
                        if(value && !isNaN(value.trim())) sum += parseInt(value.trim(), 10)
                        return {...i, autres: value, defectNumber: sum}
                    } else {
                        return i
                    }
                })
                const autres = newBoxInputs.map(i => {
                    if(i.autres && !isNaN(i.autres.trim()))
                        return parseInt(i.autres.trim(), 10)
                    return 0
                }).reduce(add, 0)
                defects = newBoxInputs.map(i => {
                    if(i.defectNumber)
                        return i.defectNumber
                    return 0
                }).reduce(add, 0)
                setTotalDefects(defects)
                setTotalAutres(autres)
                break;
            default:
                break;
        }
        setBoxInputs(newBoxInputs)
    }

    const add = (accumulator, a) =>{
        return accumulator + a
    }

    let boxInputList = boxInputs.map(i =>
        <Grid key={i.boxIndex} gridDefinition={[{ colspan: 3 }, { colspan: 9 }]}>
            <ColumnLayout  columns={1}>
                <FormField label={"Box Id"}>
                    <Input onChange={({detail}) => changeRow(i, detail.value, 'id')} value={i.id}/>
                </FormField>
            </ColumnLayout>
            <ColumnLayout columns={4}>
                <FormField style={{minWidth: "10px"}} label={"Box Date"}>
                    <Input onChange={({detail}) => changeRow(i, detail.value, 'boxDate')} value={i.boxDate}/>
                </FormField>
                <FormField label={"Box Quantity"}>
                    <Input onChange={({detail}) => changeRow(i, detail.value, 'boxQuantity')} value={i.boxQuantity}/>
                </FormField>
                <FormField label={"Number of Defects"}>
                    <Input disabled value={i.defectNumber}/>
                </FormField>
                <div/>
                <FormField label={"Manque Matiere"}>
                    <Input onChange={({detail}) => changeRow(i, detail.value, 'manqueMatiere')} value={i.manqueMatiere}/>
                </FormField>
                <FormField label={"Bavure"}>
                    <Input onChange={({detail}) => changeRow(i, detail.value, 'bavure')} value={i.bavure}/>
                </FormField>
                <FormField label={"Exces Matiere"}>
                    <Input onChange={({detail}) => changeRow(i, detail.value, 'exces')} value={i.exces}/>
                </FormField>
                <FormField label={"Autres"}>
                    <Input onChange={({detail}) => changeRow(i, detail.value, 'autres')} value={i.autres}/>
                </FormField>
            </ColumnLayout>
        </Grid>

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
                            <Container>
                                <ColumnLayout borders="horizontal" columns={1}>
                                    {boxInputList}
                                </ColumnLayout>
                                <div style={{width: "100%", marginTop: "1em",marginBottom: '3em'}}>
                                    <div style={{float: "right"}}>
                                        <Button onClick={addRow} variant="normal">Add Row</Button>
                                    </div>
                                </div>
                            </Container>
                            <Container header={
                                <Header variant="h5">
                                    Totals
                                </Header>
                            }>
                                <ColumnLayout columns={6}>
                                    <FormField label="Box Quantity">
                                        <Input disabled value={totalBoxQuantity}/>
                                    </FormField>
                                    <FormField label="Defects">
                                        <Input disabled value={totalDefects}/>
                                    </FormField>
                                    <FormField label="Manque Matiere">
                                        <Input disabled value={totalManque}/>
                                    </FormField>
                                    <FormField label="Bavure">
                                        <Input disabled value={totalBavure}/>
                                    </FormField>
                                    <FormField label="Exces Matiere">
                                        <Input disabled value={totalExces}/>
                                    </FormField>
                                    <FormField label="Autres">
                                        <Input disabled value={totalAutres}/>
                                    </FormField>
                                </ColumnLayout>
                            </Container>
                        </SpaceBetween>
                    </Container>
                </Form>
            </form>
        </Container>
    )
};