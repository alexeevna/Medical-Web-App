import React, {Component} from "react";
import ReviewService from "../services/review.service"
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import ReviewCard from "./review-card.component";
import AuthService from "../services/auth.service";
import {Divider} from "@material-ui/core";

export default class reviewComponentOld extends Component {
    constructor(props) {
        super(props);
        this.handleSubmitReview = this.handleSubmitReview.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.getReviews = this.getReviews.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.state = {
            targetId: this.props.targetId,
            reviews: [],
            content: "",
            submittedSuccessfully: false,
            message: null,
        };
    }

    handleSubmitReview(e) {
        e.preventDefault();
        if (this.checkBtn.context._errors.length === 0) {
            ReviewService.saveReview(this.state.content, this.state.targetId).then(
                () => {
                    this.setState({
                        submittedSuccessfully: true,
                        message: "Успешно опубликовано",
                        content: "",
                    });
                    this.getReviews();
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

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }

    componentDidMount() {
        this.getReviews();
    }

    getReviews() {
        console.log(this.state.targetId);
        ReviewService.getAllReviews(this.state.targetId)
            .then(response => {
                const { reviews } = response.data;
                this.refreshList();

                this.setState({reviews: reviews })
            })
            .catch((e) => {
                console.log(e);
            });
    }

    refreshList() {
        this.setState({
            reviews: [],
        });
    }

    render() {
        return (
            <div>

                {this.state.targetId !== AuthService.getCurrentUser().id &&
                <div className="jumbotron align-center color-light-blue">
                    <Divider/>
                    <Form
                        onSubmit={this.handleSubmitReview}
                        ref={c => {this.inputForm = c;}}
                    >
                        <div className="form-group">
                            <label htmlFor="content">Оставить отзыв:</label>
                            <textarea className="form-control"
                                      id="exampleFormControlTextarea1"
                                      rows="4"
                                      onChange={this.onChangeContent}
                                      value={this.state.content}
                                      autoComplete="off"
                            >
                            </textarea>
                        </div>

                        <div className="form-group top-buffer-10">
                            <button
                                className="btn btn-primary btn-block color-dark-blue"
                                disabled={!this.state.content}
                            >
                                <span>Опубликовать</span>
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
                            style={{ display: "none" }}
                            ref={c => {this.checkBtn = c;}}
                        />

                    </Form>
                </div>}
                <ul className="list-group">
                    {this.state.reviews &&
                    this.state.reviews.map((review, index) => (
                        <li
                            style={{listStyleType: "none"}}
                            key={index}
                        >
                            <ReviewCard review={review} isPreview={true} isReply={false}/>
                        </li>

                    ))}
                </ul>
            </div>
        )
    }
}