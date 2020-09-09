import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,Button, Modal,ModalHeader, 
	ModalBody, Jumbotron, Form, FormGroup, Input, Label,Col,Row } from 'reactstrap';
	
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors } from 'react-redux-form';



    function RenderDish({dish}) {
        console.log("DishDetail Component render is invoked");
    	if(dish!= null){

    		return(
    			<Card>
    				<CardImg width='100%' src={dish.image} alt={dish.name} />
    				<CardBody>
    					<CardTitle>{dish.name}</CardTitle>
    					<CardText>{dish.description}</CardText>
    				</CardBody>
    			</Card>
    		);

    	}else
    		return(
    			<div></div>
    		);
    }

    function RenderComments({comments}) {
    	 if(comments != null){
    	 	return (

    	 		<div>
    	 			<h4>Comments</h4>
    	 			<ul className="list-unstyled">
    	 				{
    	 					comments.map((comment) =>{
    	 						return(
    	 							<li key={comment.id}>
    	 								<p>{comment.comment}</p>
    	 								<p>--{comment.author},{new Intl.DateTimeFormat('en-US',{year:'numeric',month: 'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
    	 							</li>
    	 						);
    	 					})
    	 				}
    	 			</ul>
    	 		</div>

    	 	)
    	 }
    	 else
    	 	return(<div></div>);
    }

    const  DishDetail = (props) => {
        if (props.dish != null) {
			return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
					<RenderComments comments={props.comments} />
                        <CommentForm />
                    </div>
                </div>
                </div>
            );
            
        	}else{
        		return(<div></div>);
        	}




		}

		class CommentForm extends Component{
		
		
			constructor(props){
				super(props);
		
		
		
				this.state={
					isModalOpen: false
				};
		
		
		
				this.handleSubmit = this.handleSubmit.bind(this);
				this.toggleModal = this.toggleModal.bind(this);
			}
		
			handleSubmit(values) {
				console.log('Current State is: ' + JSON.stringify(values));
				alert('Current State is: ' + JSON.stringify(values));
			}


			toggleModal(){
				this.setState({
					isModalOpen: !this.state.isModalOpen
				});
			}
		
			render(){
				return(
					<div>
						<Button outline color="secondary"  onClick={this.toggleModal}>
							<span className="fa fa-pencil fa-lg"></span> Submit Comment
						</Button>
						<Modal isOpen={this.state.isModalOpen} toggle = {this.toggleModal}>
								<ModalHeader toggle = {this.toggleModal}> Submit Comment </ModalHeader>
								<ModalBody>
									<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
										<Row className="form-group">
											<Label htmlFor="rating" md={2}>Rating</Label>
											<Col md={12}>
												<Control.select model=".rating" name="rating"
												className="form-control">
												<option>1</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
												<option>6</option>
												<option>7</option>
												<option>8</option>
												<option>9</option>
												<option>10</option>
												</Control.select>
											</Col>
										</Row>
										<Row className="form-group">
											<Label htmlFor="yourName" md={12}>Your Name</Label>
											<Col md={12}>
												<Control.text model=".yourName" id="yourName" name="yourName"
												placeholder="Your Name"
												className="form-control"
												 />
											</Col>
										</Row>
										<Row className="form-group">
											<Label htmlFor="comment" md={12}>Comment</Label>
											<Col md={12}>
												<Control.textarea model=".comment" id="comment" name="comment"
													rows="5"
													className="form-control" />
											</Col>
										</Row>
										<Row className="form-group">
											<Col md={{size:10, offset: 2}}>
												<Button type="submit" color="primary">
												Submit</Button>
											</Col>
										</Row>
									</LocalForm>
								</ModalBody>
						</Modal>
					</div>
				);
		
			}
		
		}
		


export default DishDetail;