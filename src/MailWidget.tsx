import React, {ChangeEvent, Component} from 'react';
import './css/MailWidget.css';
import mailIcon from './resources/email.svg';
import sendIcon from './resources/send-mail.svg';

interface MailWidgetState {
	hidden: boolean;
	subject: string;
	body: string;
}

class MailWidget extends Component<{}, MailWidgetState> {

	constructor(props: any) {
		super(props);
		this.state = {
			hidden: true,
			subject: "",
			body: "",
		};
	}

	toggleHidden = () => {
		this.setState(prev => { return { hidden: !prev.hidden } });
	}

	updateSubject = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({ subject: event.currentTarget.value });
	}

	updateBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
		this.setState({ body: event.currentTarget.value });
	}

	sendEmail = () => {
		document.location.href = "mailto:noahwager+reactthreejs@gmail.com?subject="
			+ encodeURIComponent(this.state.subject)
			+ "&body=" + encodeURIComponent(this.state.body);
	}

	render() {
		return (
			<div className={`MailWidget ${this.state.hidden ? "down" : ""}`}>
				<button className="mail-button" onClick={this.toggleHidden}>
					<img src={mailIcon} alt="email contact form" />
				</button>
				<div className="mail-container">
					<div className="mail-text-container">
						<span className="mail-label">Subject</span>
						<input type="text" className="mail-input mail-subject" value={this.state.subject} onChange={this.updateSubject} />
						<span className="mail-label">Body</span>
						<textarea className="mail-input mail-body" value={this.state.body} onChange={this.updateBody} />
						<button className="send-button" onClick={this.sendEmail}>
								<img src={sendIcon} alt="send email" />
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default MailWidget;