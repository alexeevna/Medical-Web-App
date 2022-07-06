import React, { Component } from "react";
import RecordService from "../../services/record.service";
import Pagination from "@material-ui/lab/Pagination";
import SelectReact from 'react-select';
import RecordCard from "./record-card.component";
// import Topic from "./topic.component"
import TopicService from "../../services/topic.service";
import {Card, Grid, IconButton, InputBase, Paper, Select, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {Link} from "react-router-dom";

const useStyles = theme => ({
    button: {
        width: 200,
        margin: theme.spacing(1),
        backgroundColor: '#f50057',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#ff5983',
            color: '#ffffff',
        }
    },
    paper: {
        height: 42,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 800,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    selectForm: {
        "& .MuiFormLabel-root": {
            margin: 0
        },
        width: 800,
    },
    topicPaper: {
        width: 200,
        margin: theme.spacing(1),
        padding: theme.spacing(3),
    },
    topicTitle: {
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
    },
    reset: {
        fontSize: 15,
        textAlign: "right",
        color: '#f50057',
    },
    mainGrid: {
        display: 'flex',
        minWidth: 1000,
    },
    paper2: {
        margin: theme.spacing(3),
        padding: theme.spacing(3),
        color: "black",
    },
    firstGrid: {
        marginTop: theme.spacing(3),
    },
    grid: {
        margin: theme.spacing(1),
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
    },
    record: {
        minWidth: 1000
    },
})

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class ViewRecordsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.getRecords = this.getRecords.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.displayRecordThread = this.displayRecordThread.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        // this.onTopicsDropdownSelected = this.onTopicsDropdownSelected.bind(this);
        this.handleTopics = this.handleTopics.bind(this);


        this.state = {
            records: [],
            currentRecord: null,
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            pageSize: 10,

            showTopics: true,
            availableTopics: [],
            selectedTopic: null,
            selectedTopicValue: "",
            selectedTopicID: null,
        };

        this.pageSizes = [{value: 2, label: '2'}, {value: 4, label: '4'}, {value: 10, label: '10'}];
    }

    componentDidMount() {
        this.getRecords();

        TopicService.getAllTopics()
            .then(response => {
                    let topicsForSelect = response.data.topics.map(el => {
                        return {value: el.id, label: el.name};
                    })
                    this.setState({
                        availableTopics: topicsForSelect
                    });
                },
                error => {
                    console.log(error);
                }
            );
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        });
    }

    // onTopicsDropdownSelected(selectedTopic) {
    //     this.setState({
    //         selectedTopic: selectedTopic.value,
    //         selectedTopicValue: selectedTopic
    //     });
    // }


    handleTopics(e) {
        let topicId;
        this.state.availableTopics.map(topic => {
            if (e.target.value.indexOf(topic.label) !== -1) {
                topicId = topic.value;
            }
        });
        this.setState({
            selectedTopicId: topicId,
            selectedTopicValue: e.target.value
        })
    }

    getRecords() {
        const { searchTitle, page, pageSize, selectedTopicValue } = this.state;
        RecordService.getAll(page, pageSize, searchTitle, selectedTopicValue)
            .then((response) => {
                console.log(response.data)
                const { records, totalPages } = response.data;
                this.refreshList();

                this.setState({
                    records: records,
                    count: totalPages,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    refreshList() {
        this.setState({
            records: [],
            count: -1,
        });
    }

    displayRecordThread(record) {
        this.props.history.push({
            pathname: '/records/thread/' + record.id,
            state: { recordId: record.id }
        });
        window.location.reload();
    }

    handlePageChange(event, value) {
        this.setState(
            {
                page: value,
            },
            () => {
                this.getRecords();
            }
        );
    }

    handlePageSizeChange(selectedItem) {
        this.setState(
            {
                pageSize: selectedItem.value,
                page: 1
            },
            () => {
                this.getRecords();
            }
        );
    }

    render() {
        const {
            searchTitle,
            page,
            count,
        } = this.state;
        const {classes} = this.props;
        return (
            <Grid item className={classes.mainGrid}>
                <Grid xs={12} className={classes.firstGrid}>
                    <Grid xs={8} item>
                        {/*<input
                            type="text"
                            className="form-control"
                            placeholder="Введите часть заголовка"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.getRecords}
                            >
                                Найти
                            </button>
                        </div>*/}
                        <Paper component="form" className={classes.paper} >
                            <InputBase
                                value={searchTitle}
                                onChange={this.onChangeSearchTitle}
                                className={classes.input}
                                placeholder="Поиск"
                                // inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton type="button" onClick={this.getRecords} className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>

                        <FormControl className={classes.selectForm} fullWidth>
                            <Select
                                className={classes.root}
                                labelId="selected-topics"
                                // variant="outlined"
                                value={this.state.selectedTopicValue}
                                onChange={this.handleTopics}
                                input={<Input id="select-multiple-chip-for-topics"/>}
                                renderValue={(selected) => (
                                    <div className={classes.chips}>
                                        {
                                            <Chip key={selected} label={selected} className={classes.chip}/>
                                        }
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.state.availableTopics.map(x => (
                                    <MenuItem key={x.value} value={x.label} id={x.value}>
                                        {x.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <div className="mt-3">
                        <div className="row">
                            <div style={{marginLeft: "17px", marginTop: "5px"}}>{"Количество постов на странице: "}</div>
                            <SelectReact className="col-2"
                                    onChange={this.handlePageSizeChange}
                                    options={this.pageSizes}
                                    autoFocus={true}
                                    defaultValue={this.pageSizes[2]}
                                    styles={stylesForSmallSelectBox}
                            />
                        </div>

                        <Pagination
                            className="my-3"
                            count={count}
                            page={page}
                            siblingCount={1}
                            boundaryCount={1}
                            variant="outlined"
                            shape="rounded"
                            onChange={this.handlePageChange}
                        />
                    </div>


                    <Grid container spacing={2} direction={"column"}>
                        {this.state.records &&
                        this.state.records.map((record, index) => (
                            <Grid item
                                style={{listStyleType: "none"}}
                                key={index}
                                // onClick={() => this.displayRecordThread(record)}
                            >
                                <RecordCard record={record} isPreview={true} isReply={false} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid xs={4} item>
                    <Card className={classes.paper2}>
                        <Grid className={classes.grid}>
                            <Link to={"/records/create"} style={{textDecoration: 'none'}}>
                                <Button className={classes.button}>
                                    Создать пост
                                </Button>
                            </Link>
                            <Link to={"/topics/create"} style={{textDecoration: 'none'}}>
                                <Button className={classes.button}>
                                    Страница тэгов
                                </Button>
                            </Link>
                        </Grid>
                    </Card>
                </Grid>

                {/*<div className="col-sm-2">*/}
                {/*    <Button variant="contained" href="/records/create" className={classes.button}>*/}
                {/*        Создать пост*/}
                {/*    </Button>*/}
                {/*    <Button variant="contained" href="/topics/create" className={classes.button}>*/}
                {/*        Страница тэгов*/}
                {/*    </Button>*/}

                    {/*<Paper className={classes.topicPaper}>*/}
                    {/*    <Grid container spacing={1} direction={"column"}>*/}
                    {/*        <Grid item*/}
                    {/*              onClick={() => (*/}
                    {/*                  this.setState({*/}
                    {/*                          selectedTopic: null,*/}
                    {/*                      },*/}
                    {/*                      this.getRecords*/}
                    {/*                  ))}>*/}
                    {/*            <Typography variant="body1" className={classes.topicTitle}>*/}
                    {/*                Список тэгов:*/}
                    {/*            </Typography>*/}
                    {/*        </Grid>*/}
                    {/*        {this.state.availableTopics && this.state.availableTopics.map((topic, index) => (*/}
                    {/*            <Grid item*/}
                    {/*                  style={{listStyleType: "none"}}*/}
                    {/*                  key={index}*/}
                    {/*                  onClick={() => (*/}
                    {/*                      this.setState({*/}
                    {/*                              selectedTopic: topic.value,*/}
                    {/*                          },*/}
                    {/*                          this.getRecords*/}
                    {/*                      ))}*/}
                    {/*            >*/}
                    {/*                <ButtonBase>*/}
                    {/*                    {topic.label}*/}
                    {/*                </ButtonBase>*/}
                    {/*            </Grid>*/}
                    {/*        ))}*/}
                    {/*        <Grid item*/}
                    {/*              onClick={() => (*/}
                    {/*                  this.setState({*/}
                    {/*                          selectedTopic: null,*/}
                    {/*                      },*/}
                    {/*                      this.getRecords*/}
                    {/*                  ))}>*/}
                    {/*            <Typography className={classes.reset}>*/}
                    {/*                <ButtonBase>*/}
                    {/*                    сбросить*/}
                    {/*                </ButtonBase>*/}
                    {/*            </Typography>*/}
                    {/*        </Grid>*/}
                    {/*    </Grid>*/}
                    {/*</Paper>*/}
                {/*</div>*/}

            </Grid>
        );
    }
}

const stylesForSmallSelectBox = {
    control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        minHeight: '30px',
        height: '30px',
        boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        height: '30px',
        padding: '0 6px'
    }),

    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '30px',
    }),
};

export default withStyles(useStyles)(ViewRecordsList)