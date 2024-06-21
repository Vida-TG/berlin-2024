import React, { useEffect, useState } from 'react';
import MatchList from '../components/MatchList';
import './MatchesPage.css';

const MatchesPage = ({matches}) => {

    return (
        <div className="matches-page">
            <h1 className="matches-title">Fixtures</h1>
            <MatchList matches={matches} />
        </div>
    );
};

export default MatchesPage;
