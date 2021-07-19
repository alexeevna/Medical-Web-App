import React, {Component} from "react";
import AuthService from "../services/auth.service";
import AttachmentService from "../services/attachment.service";
import ReviewService from "../services/review.service"
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

export default class reviewComponent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmitReview = this.handleSubmitReview.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);

        this.state = {
            content: "",
            submittedSuccessfully: false,
            message: null,
        };
    }

    handleSubmitReview(e) {
        e.preventDefault();
        if (this.checkBtn.context._errors.length === 0) {
            ReviewService.saveReview(this.state.content).then(
                () => {
                    this.setState({
                        submittedSuccessfully: true,
                        message: "Успешно опубликовано",
                        content: "",
                    });
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

    render() {
        return (
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
        )
    }
}