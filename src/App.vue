<script lang="ts" setup>
import { computed, ref } from "vue";
import { DateFormats, formatDate } from "@/utils/helpers";

const files = ref<any[]>([]);
const chats = ref<any[]>([]);
const selectedChat = ref();
const chatError = ref();
const messages = ref<any[]>([]);

function parse(event) {
	for(const file of event.target.files) {
		if(file.name === '_chat.txt') {
			selectedChat.value = file;
		} else {
			files.value.push(file);
		}
	}
	
	if(selectedChat.value) {
		process();
	} else {
		chatError.value = true;
	}
}

const parseMessages = (messages: string[]) => {
	const parsedMessages: any[] = [];
	messages.forEach((message) => {
		const matches = message.match(/\[(.*)\/(.*)\/(.*), (.*):(.*):(.*)] ([^:]+): (.*)/);
		if (matches) {
			const [,
				year,
				month,
				date,
				hours,
				minutes,
				seconds,
				sender,
				text
			] = matches;
			parsedMessages.push({
				timestamp: new Date(+(2000 + +(year)), (+month - 1), +date, +hours, +minutes, +seconds),
				sender,
				text,
				first: parsedMessages.at(-1)?.sender !== sender,
			});
		} else if(message) {
			parsedMessages.push({
				timestamp: '',
				sender: '',
				text: message,
				first: true,
			});
		}
	});
	
	return parsedMessages;
};

function process() {
	const fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) {
		const rawMessages = String(fileLoadedEvent?.target?.result)?.split('\r\n');
		
		messages.value = parseMessages(rawMessages);
		chats.value.push(messages.value);
	};
	
	fileReader.readAsText(selectedChat.value, "UTF-8");
}

const participants = computed(() => {
	return messages.value.reduce((participants, message) => {
		if (message.sender && !participants.includes(message.sender)) {
			participants.push(message.sender);
		}
		return participants;
	}, []);
});
</script>

<template>
	<div class="wrapper">
		<div v-if="chatError">
			No se ha encontrado ningún archivo "_chat.txt"
		</div>
		
		<nav>
			<section class="chat">
				<input
					type="file"
					webkitdirectory
					mozdirectory
					@change="parse($event)"
				>
			</section>
			<ul class="chats">
				<li
					v-for="(chat, index) in chats"
					:key="index"
					class="chat"
				>
					<div class="img-wrapper">
						<img
							:src="`https://ui-avatars.com/api/?name=${chat[0].sender}`"
							alt=""
						>
					</div>
					{{ chat[0].sender }}
				</li>
			</ul>
		</nav>
		
		<main>
			<span v-if="!messages.length">Sube un chat...</span>
			
			<header v-if="messages.length">
				{{ participants[0] }}
			</header>
			<section v-if="messages.length">
				<ul class="messages">
					<li
						v-for="(message, index) in messages"
						:key="index"
						class="message"
						:class="{
							'other': message.sender === participants[0],
							'system': !message.sender,
							'first': message.first,
						}"
					>
						<span class="text">{{ message.text }}</span>
						<span class="timestamp">{{ formatDate(message.timestamp, DateFormats.LONG) }}</span>
					</li>
				</ul>
			</section>
		</main>
	</div>
</template>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: sans-serif, serif;
	font-size: 16px;
}
</style>

<style scoped lang="scss">
.wrapper {
	display: flex;
	height: 100vh;
	width: 100vw;
	max-height: 100vh;
	overflow-y: auto;
	background: #050b1e;
	color: white;
	
	nav {
		flex-shrink: 0;
		width: 350px;
		border-right: 2px solid white;
		
		input {
			padding: 20px;
		}
		
		.chats {
			display: flex;
			flex-direction: column;
			gap: 5px;
			
			.chat {
				padding: 10px 20px;
				cursor: pointer;
				display: flex;
				align-items: center;
				gap: 15px;
				
				&:hover {
					background: #0a1b3e;
				}
				
				.img-wrapper img {
					border-radius: 50%;
					width: 40px;
					height: 40px;
				}
			}
		}
	}
	
	main {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		max-height: 100vh;
		overflow-y: auto;
		
		header {
			padding: 15px;
			min-height: 50px;
			width: 100%;
			background: #1e284f;
			display: flex;
			align-items: center;
			position: sticky;
			top: 0;
			z-index: 1;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
		}
		
		.messages {
			padding: 0 20px 20px;
			display: flex;
			flex-direction: column;
			gap: 2px;
			
			.message {
				align-self: flex-end;
				position: relative;
				display: flex;
				flex-direction: column;
				gap: 2px;
				background-color: #838eb5;
				color: #fff;
				padding: 10px;
				border-radius: 5px;
				width: auto;
				max-width: 75%;
				
				&.other {
					align-self: flex-start;
					background-color: #343d5f;
					
					.timestamp {
						align-self: flex-start;
					}
				}
				
				&.system {
					align-self: center;
				}
				
				&.first {
					margin-top: 10px;
					
					&:not(.other) {
						border-top-right-radius: 0;
					}
					
					&:before {
						content: '';
						position: absolute;
						right: -10px;
						top: 0;
						width: 0;
						height: 0;
						border-style: solid;
						border-width: 10px 10px 10px 10px;
						border-color: #838eb5 transparent transparent transparent;
					}
					
					&.other {
						border-top-left-radius: 0;
						
						&:before {
							left: -10px;
							top: 0;
							border-width: 10px 10px 10px 10px;
							border-color: #343d5f transparent transparent transparent;
						}
					}
				}
				
				.text {
				
				}
				
				.timestamp {
					align-self: flex-end;
					flex-shrink: 0;
					font-size: 12px;
					color: #fbfbfb;
				}
			}
		}
	}
}
</style>
