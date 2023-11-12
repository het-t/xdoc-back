//Pages - construct page to be created
function Page(pageProps) {
    this.id = pageProps.id;
    this.title = pageProps.title;
    this.reference = pageProps.reference;
    this.icon = pageProps.icon;
    this.coverPicture = pageProps.coverPicture;
    this.content = pageProps.content;
    this.favourite = pageProps.favourite;
    this.pageSettings = pageProps.pageSettings;
    this.path = pageProps.path;
    this.workspaceId = pageProps.workspaceId;
    this.createdAt = pageProps.createAt;
    this.updatedAt = pageProps.updatedAt;
};

function PageSettingsType() {
    this.font = 
    this.smallText = 
    this.fullWidth = 
    this.lock = 
}

const PageSettingsType = {

    font: Enumerator('default', 'serif', 'mono'),
    smallText: Boolean,
    fullWidth: Boolean,
    lock: Boolean
}

const CoverPictureType = {
    url: String,
    verticalPosition: Number
}

const ContentType = {
    type: String,
    content: []
}

const PageProps = {
    id: String,
    reference: String,
    title: String,
    icon: String,
    coverPicture: CoverPictureType,
    content: [],
    favourite: ,
    pageSettings:' ',
    path: '',
    createdAt: Datetime,
    updatedAt: Datetime
}