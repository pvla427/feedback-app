import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Topic } from '../../Topic';
import { TopicService } from '../../services/topic.service';
import { MessageResponse } from '../../MessageResponse';
import { MessageService } from '../../services/message.service';
import { faUser, faEnvelope, faMobileRetro } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faMobileRetro = faMobileRetro;

  topics: Topic[] = [];
  messageResponse: MessageResponse | null = null;
  formHidden: boolean = false;

  name = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  phoneNumber = new FormControl('', Validators.required);
  topic = new FormControl('', Validators.required);
  message = new FormControl('', Validators.required);
  recaptcha = new FormControl(null, Validators.required)

  feedbackForm: FormGroup = this.formBuilder.group({
    name: this.name,
    email: this.email,
    phoneNumber: this.phoneNumber,
    topic: this.topic,
    message: this.message,
    recaptcha: this.recaptcha
  });

  constructor(
    private formBuilder: FormBuilder, 
    private topicService: TopicService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.topicService.getTopics().subscribe((topics) => { 
      this.topics = topics;
      this.topic.setValue(this.topics[0].id); 
    });
  }

  sendFeedback(): void {
    const { recaptcha, ...formValueWithoutCaptcha } = this.feedbackForm.value;
    this.messageService.sendMessage({
      ...formValueWithoutCaptcha, 
     phoneNumber: "+7" + this.phoneNumber.value
    }).subscribe((response) => {
      this.messageResponse = response;
      this.formHidden = true;
    });
  }
}