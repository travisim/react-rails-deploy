import BasicCommentList from "../components/CommentList";

import { Button, Card, CardContent, /*Fade,*/ Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const StyledThreadView: React.FC = () => {
    return (
        <div style={{ width: "30vw", margin: "auto" }}>
            <Card>
                <CardContent>
                    <Typography component="p">{"Viewing thread:"}</Typography>
                    <Typography variant="h5" component="h5">
                        {"Inspirational Quotes"}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        {"by Aiken"}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {'"The best way to predict the future is to invent it."'}
                        <br />
                        {"- Alan Kay"}
                    </Typography>
                </CardContent>
            </Card>

            <BasicCommentList styled={true} />

            <Link to="/">
                <Button variant="contained" color="secondary">
                    {"Back to threads"}
                </Button>
            </Link>
        </div>
    );
};

export default StyledThreadView;
