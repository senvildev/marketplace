const ANIMATION_DATA = {
	bookmark_click: {
		timing: {
			easing: "ease-out"
		},
		keyframes: {
			
		}
	}
}

class Animation
{
	constructor(element, animation_name)
	{
		this.animation_element = element;
		this.animation_name = animation_name;
	}

	play()
	{
		const animation_timing = ANIMATION_DATA[this.animation_name].timing;
		const animation_keyframes = ANIMATION_DATA[this.animation_name].keyframes;

		this.animation_element.animate(animation_keyframes, animation_timing);
	}
}