/// <reference types="@rbxts/services" />

interface CoreGui extends Instance {
    /**
     * **DO NOT USE!**
     *
     * This field exists to force TypeScript to recognize this as a nominal type
     * @hidden
     * @deprecated
     */
    readonly _nominal_CoreGui: unique symbol
}

declare module "@rbxts/services" {
    export const CoreGui: CoreGui

    export const AnalyticsService: AnalyticsService
    export const AnimationClipProvider: AnimationClipProvider
    export const AssetService: AssetService
    export const AvatarEditorService: AvatarEditorService
    export const BadgeService: BadgeService
    export const CaptureService: CaptureService
    export const Chat: Chat
    export const CollectionService: CollectionService
    export const ContentProvider: ContentProvider
    export const ContextActionService: ContextActionService
    export const ControllerService: ControllerService
    export const DataStoreService: DataStoreService
    export const Debris: Debris
    export const ExperienceNotificationService: ExperienceNotificationService
    export const GamepadService: GamepadService
    export const GamePassService: GamePassService
    export const GroupService: GroupService
    export const GuiService: GuiService
    export const HapticService: HapticService
    export const HttpService: HttpService
    export const InsertService: InsertService
    export const JointsService: JointsService
    export const KeyframeSequenceProvider: KeyframeSequenceProvider
    export const Lighting: Lighting
    export const LocalizationService: LocalizationService
    export const LogService: LogService
    export const MarketplaceService: MarketplaceService
    export const MaterialService: MaterialService
    export const MemoryStoreService: MemoryStoreService
    export const MessagingService: MessagingService
    export const PathfindingService: PathfindingService
    export const PhysicsService: PhysicsService
    export const Players: Players
    export const PolicyService: PolicyService
    export const ProximityPromptService: ProximityPromptService
    export const ReplicatedFirst: ReplicatedFirst
    export const ReplicatedStorage: ReplicatedStorage
    export const RunService: RunService
    export const ScriptContext: ScriptContext
    export const ServerScriptService: ServerScriptService
    export const ServerStorage: ServerStorage
    export const SharedTableRegistry: SharedTableRegistry
    export const SocialService: SocialService
    export const SoundService: SoundService
    export const StarterGui: StarterGui
    export const StarterPack: StarterPack
    export const StarterPlayer: StarterPlayer
    export const Stats: Stats
    export const Teams: Teams
    export const TeleportService: TeleportService
    export const TextChatService: TextChatService
    export const TextService: TextService
    export const TweenService: TweenService
    export const UserInputService: UserInputService
    export const UserService: UserService
    export const VoiceChatService: VoiceChatService
    export const VRService: VRService
    export const Workspace: Workspace
}
