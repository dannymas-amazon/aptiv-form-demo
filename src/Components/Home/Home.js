import React from 'react';
import {Link, ColumnLayout, Container, Header} from "@awsui/components-react/"
import aptivLogo from '../../aptivLogo.png';

export default function Home() {

    return (
        <div>
            <ColumnLayout columns={3}>
                <div/>
                <img alt="company logo" src={aptivLogo}/>
                <div/>
            </ColumnLayout>
            <Container
                header={
                    <Header variant="h2">
                        Forms
                    </Header>
                }
            >
                <Link href="/defectForm">Defect Form</Link>
            </Container>
        </div>
    )
};