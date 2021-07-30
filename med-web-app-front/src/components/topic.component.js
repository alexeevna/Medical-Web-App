import React, {Component} from "react";
import TopicService from "../services/topic.service";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import TopicCard from "./topic-card.component";


export default class TopicComponent extends Component {
    constructor(props) {
        super(props);

        this.handleSubmitTopic = this.handleSubmitTopic.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.getTopics = this.getTopics.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.state = {
            topics: [],
            name: "",
            submittedSuccessfully: false,
            message: null,
        };
    }

    handleSubmitTopic(e) {
        e.preventDefault();
        if (this.checkBtn.context._errors.length === 0) {
            TopicService.saveTopic(this.state.name).then(
                () => {
                    this.setState({
                        submittedSuccessfully: true,
                        message: "Успешно опубликовано",
                        name: "",
                    });
                    this.getTopics();
                },
                error => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    this.setState({
                        submittedSuccessfully: false,
                        message: resMessage
                    });
                }
            )
        } else {
            this.setState({
                loading: false
            });
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    componentDidMount() {
        this.getTopics();
    }

    getTopics() {
        TopicService.getAllTopics()
            .then(response => {
                const {topics} = response.data;
                this.refreshList();
                this.setState({topics: topics})
            })
            .catch((e) => {
                console.log(e);
            });
    }

    refreshList() {
        this.setState({
            topics: [],
        });
    }

    render() {
        return (
            <div>

                <div className="row align-left color-light-blue">
                    <Form
                        onSubmit={this.handleSubmitTopic}
                        ref={c => {
                            this.inputForm = c;
                        }}
                    >
                        <div className="mt-3">
                            <div className="form-group">
                                <div style={{marginRight: "17px"}}>{"Создать тэг: "}</div>
                                <textarea className="form-control"
                                          id="exampleFormControlTextarea1"
                                          rows="1"
                                          onChange={this.onChangeName}
                                          value={this.state.name}
                                          autoComplete="off"
                                >
                    </textarea>
                            </div>
                        </div>

                        <div className="form-group top-buffer-10">
                            <button
                                className="btn btn-primary btn-block color-dark-blue"
                                disabled={!this.state.name}
                            >
                                <span>Сохранить</span>
                            </button>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.submittedSuccessfully
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}

                        <CheckButton
                            style={{display: "none"}}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />

                    </Form>
                </div>

                <ul className="list-group">
                    {this.state.topics &&
                    this.state.topics.map((topic, index) => (
                        <li
                            style={{listStyleType: "none"}}
                            key={index}
                        >
                            <TopicCard topic={topic}/>
                        </li>
                    ))}
                </ul>

            </div>
        )
    }


}