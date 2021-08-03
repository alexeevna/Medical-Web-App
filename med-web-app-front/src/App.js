import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavigationBar from "./components/navigation-bar.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import Search from "./components/search.component";
import ViewAttachmentsComponent from "./components/view-attachments.component";
import UploadAttachmentsComponent from "./components/upload-attachments.component";
import PipelinesComponent from "./components/pipelines.component";
import PipelineResultsComponent from "./components/pipeline-results.component";
import ViewRecordsComponent from "./components/view-records.component";
import CreateRecordComponent from "./components/create-record.component";
import RecordThreadComponent from "./components/record-thread.component";
import SavePipelineConfigComponent from "./components/save-pipeline-config.component";
import TopicComponent from "./components/topic.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import NotExist from "./components/not-exist.component";

class App extends Component {

  render() {
    return (
        <div>
          <NavigationBar />
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/profile/:username" component={Profile} />
              <Route exact path="/pipelines/create" component={PipelinesComponent}/>
              <Route exact path="/pipelines/results" component={PipelineResultsComponent}/>
              <Route exact path="/pipelines/save" component={SavePipelineConfigComponent}/>
              <Route exact path="/files/view" component={ViewAttachmentsComponent}/>
              <Route exact path="/files/upload" component={UploadAttachmentsComponent}/>
              <Route exact path="/records/view" component={ViewRecordsComponent}/>
              <Route exact path="/records/create" component={CreateRecordComponent}/>
              <Route path="/records/thread/:recordId" component={RecordThreadComponent}/>
              <Route exact path="/topics/create" component={TopicComponent} />
              <Route component={NotExist} />
            </Switch>
          </div>
        </div>
    );
  }
}

export default App;