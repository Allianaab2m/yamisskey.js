export type ID = string;

type TODO = Record<string, any>;

export type User = {
	id: ID;
	username: string;
	host: string | null;
	name: string;
	onlineStatus: 'online' | 'active' | 'offline' | 'unknown';
	avatarUrl: string;
	avatarBlurhash: string;
	emojis: {
		name: string;
		url: string;
	}[];
};

export type MeDetailed = User & {
	avatarId: DriveFile['id'];
	bannerId: DriveFile['id'];
	autoAcceptFollowed: boolean;
	noCrawle: boolean;
	isExplorable: boolean;
	hideOnlineStatus: boolean;
	mutedWords: string[][];
	[other: string]: any;
};

export type DriveFile = {
	id: ID;
	createdAt: string;
	isSensitive: boolean;
	name: string;
	thumbnailUrl: string;
	url: string;
	type: string;
	size: number;
	md5: string;
	blurhash: string;
	properties: Record<string, any>;
};

export type Note = {
	id: ID;
	createdAt: string;
	text: string | null;
	cw: string | null;
	user: User;
	userId: User['id'];
	reply?: Note;
	replyId: Note['id'];
	renote?: Note;
	renoteId: Note['id'];
	files: DriveFile[];
	fileIds: DriveFile['id'][];
	visibility: 'public' | 'home' | 'followers' | 'specified';
	myReaction?: string;
	reactions: Record<string, number>;
	poll?: {
		expiresAt: string | null;
		multiple: boolean;
		choices: {
			isVoted: boolean;
			text: string;
			votes: number;
		}[];
	};
	emojis: {
		name: string;
		url: string;
	}[];
};

export type Notification = {
	id: ID;
	createdAt: string;
	isRead: boolean;
} & ({
	type: 'reaction';
	reaction: string;
	user: User;
	userId: User['id'];
	note: Note;
} | {
	type: 'reply';
	user: User;
	userId: User['id'];
	note: Note;
} | {
	type: 'renote';
	user: User;
	userId: User['id'];
	note: Note;
} | {
	type: 'quote';
	user: User;
	userId: User['id'];
	note: Note;
} | {
	type: 'mention';
	user: User;
	userId: User['id'];
	note: Note;
} | {
	type: 'pollVote';
	user: User;
	userId: User['id'];
	note: Note;
} | {
	type: 'follow';
	user: User;
	userId: User['id'];
} | {
	type: 'followRequestAccepted';
	user: User;
	userId: User['id'];
} | {
	type: 'receiveFollowRequest';
	user: User;
	userId: User['id'];
} | {
	type: 'groupInvited'; // TODO
} | {
	type: 'app';
	body: string;
	icon: string;
});

export type MessagingMessage = {
	id: ID;
	createdAt: string;
	file: DriveFile | null;
	fileId: DriveFile['id'] | null;
	isRead: boolean;
	reads: User['id'][];
	text: string | null;
	user: User;
	userId: User['id'];
	groupId: string; // TODO
};

export type InstanceMetadata = {
	emojis: {
		category: string;
	}[];
	ads: {
		id: ID;
		ratio: number;
		place: string;
		url: string;
		imageUrl: string;
	}[];
};

export type ServerInfo = {
	machine: string;
	cpu: {
		model: string;
		cores: number;
	};
	mem: {
		total: number;
	};
	fs: {
		total: number;
		used: number;
	};
};

export type Stats = {
	notesCount: number;
	originalNotesCount: number;
	usersCount: number;
	originalUsersCount: number;
	instances: number;
	driveUsageLocal: number;
	driveUsageRemote: number;
};

export type Page = {
	id: ID;
	createdAt: Date;
	updatedAt: Date;
	userId: User['id'];
	user: User;
	content: Record<string, any>[];
	variables: Record<string, any>[];
	title: string;
	name: string;
	summary: string | null;
	hideTitleWhenPinned: boolean;
	alignCenter: boolean;
	font: string;
	script: string;
	eyeCatchingImageId: DriveFile['id'] | null;
	eyeCatchingImage: DriveFile | null;
	attachedFiles: any;
	likedCount: number;
	isLiked?: boolean;
};

export type PageEvent = {
	pageId: Page['id'];
	event: string;
	var: any;
	userId: User['id'];
	user: User;
};

export type UserSorting = '+follower' | '-follower' | '+createdAt' | '-createdAt' | '+updatedAt' | '-updatedAt';
export type OriginType = 'combined' | 'local' | 'remote';