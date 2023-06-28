
const tryRequire = (path) => {
    try {
    const image = require(`${path}`);
    return image
    } catch (err) {
    return false
    }
};

export default {

questionMark: require('./questionMark.png'),
MacBookAir1_pexelsjulieviken5934511: tryRequire('./MacBookAir1_pexelsjulieviken5934511.png') || require('./questionMark.png'),
Search_Line7: tryRequire('./Search_Line7.png') || require('./questionMark.png'),
Overlay_Line7: tryRequire('./Overlay_Line7.png') || require('./questionMark.png'),
OverlayProducts_Line10: tryRequire('./OverlayProducts_Line10.png') || require('./questionMark.png'),
Overlay2_Line7: tryRequire('./Overlay2_Line7.png') || require('./questionMark.png'),
MacBookAir1_Rectangle1: tryRequire('./MacBookAir1_Rectangle1.png') || require('./questionMark.png'),
MacBookAir1_pexelsylanitekoppens6128251: tryRequire('./MacBookAir1_pexelsylanitekoppens6128251.png') || require('./questionMark.png'),
MacBookAir1_icons_payment1: tryRequire('./icons_payment1.png') || require('./questionMark.png'),
iPadmini831_Profilepicture1: tryRequire('./Profilepicture1') || require('./questionMark.png'),
iPadmini831_Line3: tryRequire('./iPadmini831_Line3.png') || require('./questionMark.png'),
iPadmini831_Line4: tryRequire('./iPadmini831_Line4.png') || require('./questionMark.png'),
iPadmini831_Line5: tryRequire('./iPadmini831_Line5.png') || require('./questionMark.png'),
}