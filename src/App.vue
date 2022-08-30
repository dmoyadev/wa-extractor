<script lang="ts" setup>
import { ref } from "vue";

const files = ref<any[]>([]);
const chat = ref();
const messages = ref<any[]>([]);

function parse(event) {
	for(const file of event.target.files) {
		if(file.name === '_chat.txt') {
			chat.value = file;
		} else {
			files.value.push(file);
		}
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
				timestamp: new Date(+(2000 + year), (+month - 1), +date, +hours, +minutes, +seconds),
				sender,
				text,
			});
		} else {
			parsedMessages.push({
				timestamp: '',
				sender: '',
				text: message,
			});
		}
	});
	
	return parsedMessages;
};

function process() {
	const fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) {
		const rawMessages = String(fileLoadedEvent?.target?.result)?.split('\n');
		
		messages.value = parseMessages(rawMessages);
	};
	
	fileReader.readAsText(chat.value, "UTF-8");
}
</script>

<template>
	<div>
		<input
			type="file"
			webkitdirectory
			mozdirectory
			@change="parse($event)"
		>
		
		<div
			v-for="file in files"
			:key="file.name"
		>
			{{ file.name }}
		</div>
		
		<div v-if="chat">
			Se ha encontrado un chat, ¡procésalo!
			<button @click="process()">
				Procesar
			</button>
		</div>
		<div v-else>
			No se ha encontrado ningún archivo "_chat.txt"
		</div>
		
		<div v-if="messages.length">
			<p
				v-for="(message, index) in messages"
				:key="index"
			>
				{{ message.timestamp }} - {{ message.sender }}: {{ message.text }}
			</p>
		</div>
	</div>
</template>

<style>

</style>
