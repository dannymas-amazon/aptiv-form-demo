import React, {useState, useEffect} from 'react';
import {Link} from "@awsui/components-react/"
import aptivLogo from '../../aptivLogo.png';

export default function Home() {
    return (
        <div>
            <img src={aptivLogo}/>
            <Link href="/form1">Form 1</Link>
        </div>
    )
};