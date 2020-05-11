import React, { PureComponent, createRef, RefObject, Fragment } from "react";
import s from './editor.module.less';

import GameContainer from "@containers/game-container/GameContainer";

import { inject, Workspace } from "blockly";
import Compiler from 'blockly/javascript';
import { toolbox } from './components';
import * as Blocks from './components/blocks/Blocks';

class EditorContainer extends PureComponent<{}, IEditorState>
{
	private readonly editor: RefObject<HTMLDivElement>;
	private workspace: Workspace | undefined;
	
	public state: IEditorState =
	{
		code: null
	};
	
	constructor(props: any)
	{
		super(props);
		this.editor = createRef();
	}
	
	public componentDidMount(): void
	{
		// @TODO: FIX REF OF THIS.EDITOR.CURRENT
		setTimeout(() =>
		{
			if (this.editor.current)
			{
				this.workspace = inject(this.editor.current, {
					toolbox: toolbox,
					move: {
						scrollbars: false
					}
				});
			}
		}, 50);
		console.log(Blocks);
	}
	
	private onRunEventHandler = (): void =>
	{
		this.setState({
			code: Compiler.workspaceToCode(this.workspace)
		});
	};
	
	public render(): JSX.Element
	{
		const { code } = this.state;
		
		return (
			<Fragment>
				<div className={s.appEditorContainer}>
					<div className={s.appRunButton}>
						<button onClick={this.onRunEventHandler}>
							Run
						</button>
					</div>
					<div
						className={s.appEditor}
						ref={this.editor}
					/>
				</div>
				<GameContainer code={code != null ? code : null } />
			</Fragment>
		);
	}
	
}

export default EditorContainer